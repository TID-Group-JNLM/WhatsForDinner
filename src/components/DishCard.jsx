import { Link } from "react-router";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//Draws one dish: image, name, link to dish page.
//If dish is a suggestion card will have dashed orange border and "Suggested by" text.
export default function DishCard({
  dish,
  onRemove,
  isSuggestion = false,
  suggestedBy,
  statusLabel,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        flexGrow: 1,
        borderStyle: isSuggestion ? "dashed" : "solid",
        borderColor: isSuggestion ? "warning.main" : "divider",
        borderWidth: isSuggestion ? 1.5 : 1,
      }}
    >
      <CardActionArea component={Link} to={`/dishes/${dish.id}`}>
        {dish.imageUrl && (
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              image={dish.imageUrl}
              loading="lazy"
              alt=""
              sx={{
                aspectRatio: "4 / 3",
                opacity: isSuggestion ? 0.5 : 1,
              }}
            />

            {isSuggestion && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
              </Box>
            )}
          </Box>
        )}
        <CardContent sx={{ p: 1.5 }}>
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
