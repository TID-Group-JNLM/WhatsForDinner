import { useState, useEffect } from "react";
import {
  loadMealPlan,
  removeDishFromMealPlan,
  addDishToMealPlan,
} from "../services/mealPlanService.js";
import { getCurrentUser } from "../services/authService.js";
import { fetchDishes } from "../services/dishService.js";
import { fetchFamilyMembers } from "../services/familyService.js";
import MealPlanDay from "../components/MealPlan/MealPlanDay.jsx";
import WeekNavigation from "../components/MealPlan/WeekNavigation.jsx";
import {
  loadSuggestions,
  removeSuggestion,
  suggestDish,
} from "../services/suggestionService.js";
import { isSameDay } from "../utilities/dates.js";
import { useWeek } from "../hooks/useWeek.js";
import { Typography, Stack } from "@mui/material";

function findName(members, userId) {
  const member = members.find((each) => each.id === userId);
  //not found if the child has left the family after suggesting
  return member ? member.name : null;
}

export default function MealPlanPage() {
  //RequireLogin in App.jsx makes sure there is a user with a family here
  const { familyId, role } = getCurrentUser();
  //Hiding buttons from children is only for usability
  //Who may change the plan must still be enforced on the server
  const isParent = role === "parent";

  const { weekStart, days, showPreviousWeek, showNextWeek } = useWeek();

  const [mealPlan, setMealPlan] = useState([]);
  const [status, setStatus] = useState("loading");
  const [dishes, setDishes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [members, setMembers] = useState([]);

  // Suggestions belong to the week like the meal plan, so they load together
  useEffect(() => {
    async function load() {
      setStatus("loading");
      try {
        setMealPlan(await loadMealPlan(weekStart, familyId));
        setSuggestions(await loadSuggestions(weekStart, familyId));
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }
    load();
  }, [weekStart, familyId]);

  // Separate from the week's data: dishes don't change when the week changes.
  // It doesn't touch status, so a slow or failed dish list can't hide the meal plan.
  useEffect(() => {
    async function loadDishes() {
      try {
        setDishes(await fetchDishes(familyId));
      } catch (error) {
        console.error(error);
      }
    }
    loadDishes();
  }, [familyId]);

  // Only used for the names on suggestions, so like the dishes it can't hide the meal plan
  useEffect(() => {
    async function loadMembers() {
      try {
        setMembers(await fetchFamilyMembers());
      } catch (error) {
        console.error(error);
      }
    }
    loadMembers();
  }, [familyId]);

  async function handleAdd(dishId, day) {
    try {
      const newEntry = await addDishToMealPlan(dishId, day);
      setMealPlan([...mealPlan, newEntry]);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleRemove(entryId) {
    try {
      await removeDishFromMealPlan(entryId);
      setMealPlan(mealPlan.filter((each) => each.id !== entryId));
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDismiss(suggestionId) {
    try {
      await removeSuggestion(suggestionId);
      setSuggestions(suggestions.filter((each) => each.id !== suggestionId));
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleAccept(suggestion) {
    try {
      // Add first, delete after: if adding fails (e.g. already planned), the suggestion is kept
      const newEntry = await addDishToMealPlan(
        suggestion.dish.id,
        suggestion.date,
      );
      await removeSuggestion(suggestion.id);
      setMealPlan([...mealPlan, newEntry]);
      setSuggestions(suggestions.filter((each) => each.id !== suggestion.id));
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSuggest(dishId, day) {
    try {
      const newSuggestion = await suggestDish(dishId, day);
      setSuggestions([...suggestions, newSuggestion]);
    } catch (error) {
      alert(error.message);
    }
  }

  if (status === "loading") return <p>Loading your meal plan...</p>;
  if (status === "failed") return <p>Could not reach the server. Try again</p>;

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h1">
        Meal plan
      </Typography>
      <WeekNavigation
        weekStart={days[0]}
        weekEnd={days[6]}
        onPrevious={showPreviousWeek}
        onNext={showNextWeek}
      />
      {days.map((day) => {
        const dayEntries = mealPlan.filter((entry) =>
          isSameDay(entry.date, day),
        );
        const daySuggestions = suggestions
          .filter((suggestion) => isSameDay(suggestion.date, day))
          .map((suggestion) => ({
            ...suggestion,
            suggestedBy: findName(members, suggestion.userId),
          }));
        return (
          <MealPlanDay
            key={day.getTime()}
            day={day}
            entries={dayEntries}
            dishes={dishes}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onDismissSuggestion={handleDismiss}
            onAcceptSuggestion={handleAccept}
            suggestions={daySuggestions}
            onSuggest={handleSuggest}
            isParent={isParent}
          />
        );
      })}
    </Stack>
  );
}
