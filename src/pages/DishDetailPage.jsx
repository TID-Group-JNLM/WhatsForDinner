import { useParams } from "react-router";
import { fetchDish, fetchIngredientsForDish } from "../services/dishService";
import { useEffect } from "react";
import { useState } from "react";
import { Stack, Typography, Box, List, ListItem } from "@mui/material";

export default function DishDetailPage() {
  const { dishId } = useParams();
  const [dish, setDish] = useState(null);
  const [status, setStatus] = useState("loading");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setDish(await fetchDish(dishId));
        setIngredients(await fetchIngredientsForDish(dishId));
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }
    load();
  }, [dishId]);

  if (status === "loading") return <p>Loading ...</p>;
  if (status === "failed") return <p>Could not load the dish.</p>;

  return (
    <Stack spacing={3}>
      <Typography variant="h5" component="h1">
        {dish.name}
      </Typography>

      {dish.imageUrl && (
        <Box
          component="img"
          src={dish.imageUrl}
          alt=""
          sx={{
            width: "100%",
            aspectRatio: "4 / 3",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      )}
      <Stack component="section" spacing={1}>
        <Typography variant="h6" component="h2">
          Ingredients
        </Typography>
        <List
          disablePadding
          divider
          disableGutters
          sx={{ justifyContent: "space-between" }}
        >
          {ingredients.map((ingredient) => (
            <ListItem
              key={ingredient.id}
              divider
              disableGutters
              sx={{ justifyContent: "space-between" }}
            >
              <Typography>{ingredient.name}</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {ingredient.amount} {ingredient.unit}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Stack>

      <Stack component="section" spacing={1}>
        <Typography variant="h6" component="h2">
          Recipe
        </Typography>
        {dish.recipe && (
          <Typography sx={{ whiteSpace: "pre-line" }}>{dish.recipe}</Typography>
        )}
      </Stack>
    </Stack>
  );
}
