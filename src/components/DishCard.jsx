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

//Draws one dish with picture, name and link to dish page
/*Knows nothing about where it's used. Extra content is passed in through:
-imageOverlay: drawn on top of the picture
-children: drawn under the name
-sx: extra styling */
//The remove button is only shown if onRemove is given
//Card is a button if onClick is given, otherwise a link to dish page
export default function DishCard({
  dish,
  onRemove,
  onClick,
  imageOverlay,
  sx,
  children,
}) {
  const content = (
    <>
      {dish.imageUrl && (
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={dish.imageUrl}
            loading="lazy"
            alt=""
            sx={{
              aspectRatio: "4 / 3",
            }}
          />

          {imageOverlay && (
            <Box sx={{ position: "absolute", inset: 0 }}>{imageOverlay}</Box>
          )}
        </Box>
      )}
      <CardContent sx={{ p: 1.5 }}>
        <Typography variant="subtitle1">{dish.name}</Typography>
        {children}
      </CardContent>
    </>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        flexGrow: 1,
        ...sx,
      }}
    >
      {onClick ? (
        <CardActionArea onClick={onClick}>{content}</CardActionArea>
      ) : (
        <CardActionArea component={Link} to={`/dishes/${dish.id}`}>
          {content}
        </CardActionArea>
      )}
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
