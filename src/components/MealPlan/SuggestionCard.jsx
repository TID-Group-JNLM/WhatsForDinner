import DishCard from "../DishCard.jsx";
import { Box, Typography } from "@mui/material";

//A DishCard for a suggestion: dashed orange border, faded picture and who suggested it.
//All suggestion styling lives here, passed into DishCard's slots, so DishCard stays general.
//statusLabel is chosen by MealPlanDay (it is different for parents and children).
//The card opens a dialog to review suggestions if onReview is given.
export default function SuggestionCard({ suggestion, statusLabel, onReview }) {
  return (
    <DishCard
      dish={suggestion.dish}
      onClick={onReview}
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
  );
}
