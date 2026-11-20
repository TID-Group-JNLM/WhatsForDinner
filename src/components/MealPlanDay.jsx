import ChooseDishForm from "./ChooseDishForm.jsx";
import DishCard from "./DishCard.jsx";
import { Card, Typography, Stack, Box, Button } from "@mui/material";

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
      {entries.length === 0 ? (
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
        </Stack>
      )}
      {suggestions.length > 0 && (
        <Stack
          component="ul"
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", listStyle: "none", p: 0, m: 0 }}
        >
          {suggestions.map((suggestion) => (
            <Box component="li" key={suggestion.id} sx={{ width: 122 }}>
              <DishCard dish={suggestion.dish} isSuggestion={true} />
              {isParent && (
                <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => onAcceptSuggestion(suggestion)}
                  >
                    Add to plan
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onDismiss(suggestion.id)}
                  >
                    Dismiss
                  </Button>
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </Card>
  );
}
