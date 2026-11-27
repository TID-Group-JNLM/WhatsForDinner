import DishCard from "../DishCard.jsx";
import { Stack, Button } from "@mui/material";

//Uses DishCard for a suggestion, plus accept and dismiss buttons
export default function SuggestionCard({
  suggestion,
  onAccept,
  onDismiss,
  statusLabel,
}) {
  return (
    <>
      <DishCard
        dish={suggestion.dish}
        isSuggestion={true}
        suggestedBy={suggestion.suggestedBy}
        statusLabel={statusLabel}
      />
      <Stack spacing={0.5} sx={{ mt: 0.5 }}>
        {onAccept && (
          <Button size="small" variant="contained" onClick={onAccept}>
            Add to plan
          </Button>
        )}
        {onDismiss && (
          <Button size="small" variant="outlined" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
      </Stack>
    </>
  );
}
