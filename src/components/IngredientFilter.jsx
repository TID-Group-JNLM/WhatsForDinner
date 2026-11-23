import { useState } from "react";

export default function IngredientFilter({
  ingredients,
  selectedIds,
  onToggle,
}) {
  const [searchText, setSearchText] = useState("");
  const search = searchText.toLowerCase();
  const suggestions = search
    ? ingredients.filter(
        (ingredient) =>
          ingredient.name.toLowerCase().includes(search) &&
          !selectedIds.includes(ingredient.id),
      )
    : [];
  const selectedIngredients = ingredients.filter((ingredient) =>
    selectedIds.includes(ingredient.id),
  );
  const hasNoMatches = suggestions.length === 0 && search.length > 0;

  function handleSelect(ingredientId) {
    onToggle(ingredientId);
    setSearchText("");
  }

  return (
    <div>
      <ul>
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            <button type="button" onClick={() => onToggle(ingredient.id)}>
              X {ingredient.name}
            </button>
          </li>
        ))}
      </ul>
      <label htmlFor="ingredient_search">Ingredient filter</label>
      <input
        type="text"
        id="ingredient_search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {hasNoMatches && <p>No matching ingredients</p>}
      <ul>
        {suggestions.map((ingredient) => (
          <li key={ingredient.id}>
            <button type="button" onClick={() => handleSelect(ingredient.id)}>
              {ingredient.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
