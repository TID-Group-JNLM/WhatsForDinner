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

  return (
    <div>
      <label htmlFor="ingredient_search">Search ingredient</label>
      <input
        type="text"
        id="ingredient_search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ul>
        {suggestions.map((ingredient) => (
          <li key={ingredient.id}>
            <button type="button">{ingredient.name}</button>
          </li>
        ))}
      </ul>

      {ingredients.map((ingredient) => (
        <div key={ingredient.id}>
          <input
            type="checkbox"
            id={`ingredient-${ingredient.id}`}
            checked={selectedIds.includes(ingredient.id)}
            onChange={() => onToggle(ingredient.id)}
          />
          <label htmlFor={`ingredient-${ingredient.id}`}>
            {ingredient.name}
          </label>
        </div>
      ))}
    </div>
  );
}
