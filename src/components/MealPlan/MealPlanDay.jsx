import ChooseDishForm from "./ChooseDishForm.jsx";
import DishCard from "../DishCard.jsx";
import { Card, Typography, Stack, Box } from "@mui/material";
import SuggestionCard from "./SuggestionCard.jsx";
//One MealPlan per day. Each day draws a form and a row of cards
export default function MealPlanDay({
  day,
  entries,
  dishes,
  onAdd,
  onRemove,
  suggestions,
  onDismissSuggestion,
  onAcceptSuggestion,
  onSuggest,
  isParent,
}) {
  return (
    <Card variant="outlined" component="section" sx={{ p: 2 }}>
      <Typography variant="h6" component="h2">
        {day.toLocaleDateString("en-GB", { weekday: "long" })}
      </Typography>

      {/* Parents add straight to the plan; children can only suggest */}
      <ChooseDishForm
        dishes={dishes}
        onChoose={(dishId) =>
          isParent ? onAdd(dishId, day) : onSuggest(dishId, day)
        }
        buttonLabel={isParent ? "Add" : "Suggest"}
      />

      {entries.length === 0 && suggestions.length === 0 ? (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Nothing planned
        </Typography>
      ) : (
        <Stack
          component="ul"
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", listStyle: "none", p: 0, m: 0 }}
        >
          {entries.map((entry) => (
            <Box component="li" key={entry.id} sx={{ width: 122 }}>
              <DishCard
                dish={entry.dish}
                onRemove={isParent ? () => onRemove(entry.id) : undefined}
              />
            </Box>
          ))}
          {suggestions.map((suggestion) => (
            <Box component="li" key={suggestion.id} sx={{ width: 122 }}>
              <SuggestionCard
                suggestion={suggestion}
                onAccept={
                  isParent ? () => onAcceptSuggestion(suggestion) : undefined
                }
                onDismiss={
                  isParent
                    ? () => onDismissSuggestion(suggestion.id)
                    : undefined
                }
              />
            </Box>
          ))}
        </Stack>
      )}
    </Card>
  );
}
