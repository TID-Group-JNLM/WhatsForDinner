import ChooseDishForm from "./ChooseDishForm.jsx";
import DishCard from "./DishCard.jsx";

export default function MealPlanDay({
  day,
  entries,
  dishes,
  onAdd,
  onRemove,
  suggestions,
  onDismiss,
  onAcceptSuggestion,
  onSuggest,
  isParent,
}) {
  return (
    <section>
      <h2>{day.toLocaleDateString("en-GB", { weekday: "long" })}</h2>
      {/* Parents add straight to the plan; children can only suggest */}
      <ChooseDishForm
        dishes={dishes}
        onChoose={(dishId) =>
          isParent ? onAdd(dishId, day) : onSuggest(dishId, day)
        }
        buttonLabel={isParent ? "Add" : "Suggest"}
      />
      {entries.length === 0 ? (
        <p>Nothing planned</p>
      ) : (
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <DishCard dish={entry.dish} />
              {isParent && (
                <button onClick={() => onRemove(entry.id)}>Remove</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {suggestions.length > 0 && (
        <>
          <h3>Suggested</h3>
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <DishCard dish={suggestion.dish} />
                {isParent && (
                  <>
                    <button onClick={() => onAcceptSuggestion(suggestion)}>
                      Add to plan
                    </button>
                    <button onClick={() => onDismiss(suggestion.id)}>
                      Dismiss
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
