function formatDay(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function WeekNavigation({
  weekStart,
  weekEnd,
  onPrevious,
  onNext,
}) {
  return (
    <nav>
      <button onClick={onPrevious}>Previous week</button>
      <p>
        {formatDay(weekStart)} - {formatDay(weekEnd)}
      </p>
      <button onClick={onNext}>Next week</button>
    </nav>
  );
}
