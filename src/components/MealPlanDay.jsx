import AddDishForm from "./AddDishForm";
import DishCard from "./DishCard";

export default function MealPlanDay({ day, entries, dishes, onAdd, onRemove }) {
  return (
    <section>
      <h2>{day.toLocaleDateString("en-GB", { weekday: "long" })}</h2>
      {entries.length === 0 ? (
        <p>Nothing planned</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <DishCard dish={entry.dish} />
              <button onClick={() => onRemove(entry.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <AddDishForm dishes={dishes} onAdd={(dishId) => onAdd(dishId, day)} />
    </section>
  );
}
