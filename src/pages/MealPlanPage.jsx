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
  const { familyId } = getCurrentUser();
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [mealPlan, setMealPlan] = useState([]);
  const [status, setStatus] = useState("loading");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function load() {
      setStatus("loading");
      try {
        setMealPlan(await loadMealPlan(weekStart, familyId));
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }
    load();
  }, [weekStart, familyId]);

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
        const dayEntries = mealPlan.filter(
          (entry) => entry.date.toDateString() === day.toDateString(),
        );
        return (
          <MealPlanDay
            key={day.getTime()}
            day={day}
            entries={dayEntries}
            dishes={dishes}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        );
      })}
    </>
  );
}
