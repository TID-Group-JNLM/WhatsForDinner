import { Link } from "react-router";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//Draws one dish: image, name, link to dish page.
//If dish is a suggestion card will have dashed orange border and "Suggested by" text.
//Remove button is only shown for parents
export default function DishCard({
  dish,
  onRemove,
  isSuggestion = false,
  suggestedBy,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        flexGrow: 1,
        borderStyle: isSuggestion ? "dashed" : "solid",
        borderColor: isSuggestion ? "warning.main" : "divider",
      }}
    >
      <CardActionArea component={Link} to={`/dishes/${dish.id}`}>
        {dish.imageUrl && (
          <CardMedia
            component="img"
            image={dish.imageUrl}
            loading="lazy"
            alt=""
            sx={{ aspectRatio: "4 / 3" }} // same shape at every card width, so the cards line up
          />
        )}
        <CardContent>
          <Typography variant="subtitle1">{dish.name}</Typography>
          {isSuggestion && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {suggestedBy ? `Suggested by ${suggestedBy}` : "Suggestion"}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {onRemove && (
        <IconButton
          aria-label={`Remove ${dish.name}`}
          onClick={onRemove}
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            bgcolor: "background.paper",
            minWidth: 32,
            minHeight: 32,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Card>
  );
}
