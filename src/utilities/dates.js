//Responsible for calculating weekdays

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
//getDay() count the week from Sunday: so Sunday = 0, Monday = 1....
//Our week starts from Monday so we need to know how many days back to Monday, therefore %7= days back
export function getMonday(date) {
  const daysBack = (date.getDay() + 6) % 7;
  return addDays(date, -daysBack);
}

export function getWeekDays(weekStart) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(weekStart, i));
  }
  return days;
}

// Compare calendar days, not exact moments, so the time of day doesn't matter
export function isSameDay(a, b) {
  return a.toDateString() === b.toDateString();
}
