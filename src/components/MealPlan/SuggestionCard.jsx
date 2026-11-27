import DishCard from "../DishCard.jsx";
import { Stack, Button, Box, Typography } from "@mui/material";

//A DishCard for a suggestion: dashed orange border, faded picture and who suggested it.
//All suggestion styling lives here, passed into DishCard's slots, so DishCard stays general.
//statusLabel is chosen by MealPlanDay (it is different for parents and children).
//The buttons are only shown if their handler is given.
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
        sx={{
          borderStyle: "dashed",
          borderColor: "warning.main",
          borderWidth: 1.5,
        }}
        imageOverlay={
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {statusLabel && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  bgcolor: "background.paper",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {statusLabel}
              </Typography>
            )}
          </Box>
        }
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {suggestion.suggestedBy
            ? `Suggested by ${suggestion.suggestedBy}`
            : "Suggestion"}
        </Typography>
      </DishCard>
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
