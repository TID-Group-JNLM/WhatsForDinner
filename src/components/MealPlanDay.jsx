export default function MealPlanDay({ day, entries, onRemove }) {
  return (
    <section>
      <h2>{day.toLocaleDateString("en-GB", { weekday: "long" })}</h2>
      {entries.length === 0 ? (
        <p>Nothing planned</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              {entry.dishName}
              <button onClick={() => onRemove(entry.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
