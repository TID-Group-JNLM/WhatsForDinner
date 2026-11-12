


export default function IngredientFilter({ ingredients, selectedIds, onToggle }) {
  return (
    <div>
      {ingredients.map((ingredient) => (
        <div key={ingredient.id}>
          <input
            type="checkbox"
            id={`ingredient-${ingredient.id}`}
            checked={selectedIds.includes(ingredient.id)}
            onChange={() => onToggle(ingredient.id)}
          />
          <label htmlFor={`ingredient-${ingredient.id}`}>{ingredient.name}</label>
        </div>
      ))}
    </div>
  );
}