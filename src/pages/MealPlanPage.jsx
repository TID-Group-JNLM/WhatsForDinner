import { useState, useEffect } from "react";
import {
  loadMealPlan,
  removeDishFromMealPlan,
  addDishToMealPlan,
} from "../services/mealPlanService.js";
import { getCurrentUser } from "../services/authService.js";
import { fetchDishes } from "../services/dishService.js";
import MealPlanDay from "../components/MealPlanDay.jsx";
import WeekNavigation from "../components/WeekNavigation.jsx";
import {
  loadSuggestions,
  removeSuggestion,
  suggestDish,
} from "../services/suggestionService.js";

function getMonday(date) {
  const daysBack = (date.getDay() + 6) % 7;
  return addDays(date, -daysBack);
}

function getWeekDays(weekStart) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }
  return days;
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export default function MealPlanPage() {
  //RequireLogin in App.jsx makes sure there is a user with a family here
  const { familyId, role } = getCurrentUser();
  //Hiding buttons from children is only for usability
  //Who may change the plan must still be enforced on the server
  const isParent = role === "parent";
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [mealPlan, setMealPlan] = useState([]);
  const [status, setStatus] = useState("loading");
  const [dishes, setDishes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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

  async function handleAcceptSuggestion(suggestion) {
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

  function showPreviousWeek() {
    setWeekStart(addDays(weekStart, -7));
  }

  function showNextWeek() {
    setWeekStart(addDays(weekStart, 7));
  }

  if (status === "loading") return <p>Loading your meal plan...</p>;
  if (status === "failed") return <p>Could not reach the server. Try again</p>;

  const days = getWeekDays(weekStart);

  return (
    <>
      <h1>Meal plan</h1>
      <WeekNavigation
        weekStart={days[0]}
        weekEnd={days[6]}
        onPrevious={showPreviousWeek}
        onNext={showNextWeek}
      />
      {days.map((day) => {
        // Compare calendar days, not exact moments, so the time of day doesn't matter
        const dayEntries = mealPlan.filter(
          (entry) => entry.date.toDateString() === day.toDateString(),
        );
        const daySuggestions = suggestions.filter(
          (suggestion) => suggestion.date.toDateString() === day.toDateString(),
        );
        return (
          <MealPlanDay
            key={day.getTime()}
            day={day}
            entries={dayEntries}
            dishes={dishes}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onDismiss={handleDismiss}
            onAcceptSuggestion={handleAcceptSuggestion}
            suggestions={daySuggestions}
            onSuggest={handleSuggest}
            isParent={isParent}
          />
        );
      })}
    </>
  );
}
