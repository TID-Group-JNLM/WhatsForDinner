import { useState } from "react";
import { Stack, TextField, Chip } from "@mui/material";

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

  function handleSelect(ingredientId) {
    onToggle(ingredientId);
    setSearchText("");
  }

  return (
    <Stack spacing={1}>
      <TextField
        id="ingredient_search"
        label="Filter by ingredient"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {selectedIngredients.length > 0 && (
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {selectedIngredients.map((ingredient) => (
            <Chip
              key={ingredient.id}
              label={ingredient.name}
              color="primary"
              onDelete={() => onToggle(ingredient.id)}
            />
          ))}
        </Stack>
      )}
      {suggestions.length > 0 && (
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {suggestions.map((ingredient) => (
            <Chip
              key={ingredient.id}
              label={ingredient.name}
              variant="outlined"
              onClick={() => handleSelect(ingredient.id)}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
