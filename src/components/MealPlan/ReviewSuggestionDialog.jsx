import { Link } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

//Lets a parent accept or dismiss one suggestion.
//MealPlanDay decides when it is shown and what the buttons do; the dialog just reports which one was clicked
export default function ReviewSuggestionDialog({
  suggestion,
  onAccept,
  onDismiss,
  onClose,
}) {
  const weekday = suggestion.date.toLocaleDateString("en-GB", {
    weekday: "long",
  });
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Suggestion for {weekday}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{suggestion.dish.name}</Typography>
        <Typography>
          {suggestion.suggestedBy
            ? `Suggested by ${suggestion.suggestedBy}`
            : "Suggestion"}
        </Typography>
        <Button component={Link} to={`/dishes/${suggestion.dish.id}`}>
          See recipe
        </Button>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" color="error" onClick={onDismiss}>
          Dismiss
        </Button>
        <Button variant="contained" onClick={onAccept}>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}
