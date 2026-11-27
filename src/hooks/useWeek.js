import { useState } from "react";
import { getMonday, getWeekDays, addDays } from "../utilities/dates.js";
//Remembers which week is shown on the mealPlanPage
//Uses dates.js to do the date "maths"
export function useWeek() {
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));

  function showPreviousWeek() {
    setWeekStart(addDays(weekStart, -7));
  }

  function showNextWeek() {
    setWeekStart(addDays(weekStart, 7));
  }

  const days = getWeekDays(weekStart);

  return { weekStart, days, showPreviousWeek, showNextWeek };
}
