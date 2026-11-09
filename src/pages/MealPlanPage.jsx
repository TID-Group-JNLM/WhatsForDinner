import { useState, useEffect } from "react";
import {
  loadMealPlan,
  removeDishFromMealPlan,
} from "../services/mealPlanService";

//TODO: Add dish to meal plan when loadDishes is ready
function getMonday(date) {
  const daysBack = (date.getDay() + 6) % 7;
  return addDays(date, -daysBack);
}

function getWeekDays(weekStart) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(addDays(weekStart, i)));
  }
  return days;
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export default function MealPlanPage() {
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [mealPlan, setMealPlan] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      try {
        setMealPlan(await loadMealPlan(weekStart));
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }
    load();
  }, [weekStart]);

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
      <button onClick={showPreviousWeek}>Previous week</button>
      <p>
        {days[0].toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      <button onClick={showNextWeek}>Next week</button>
      {days.map((day) => {
        const dayEntries = mealPlan.filter(
          (entry) => entry.date.toDateString() === day.toDateString(),
        );
        return (
          <section key={day.getTime()}>
            <h2>{day.toLocaleDateString("en-GB", { weekday: "long" })}</h2>
            {dayEntries.length === 0 ? (
              <p>Nothing planned</p>
            ) : (
              <ul>
                {dayEntries.map((entry) => (
                  <li key={entry.id}>
                    {entry.dishName}
                    <button onClick={() => handleRemove(entry.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </>
  );
}
