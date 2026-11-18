import { useParams } from "react-router";
import { fetchDish, fetchIngredientsForDish } from "../services/dishService";
import { useEffect } from "react";
import { useState } from "react";

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
    <>
      <h1>{dish.name}</h1>
      {dish.imageUrl && <img src={dish.imageUrl} alt={dish.name} />}
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ul>
      <h2>Recipe</h2>
      {dish.recipe && <p>{dish.recipe}</p>}
    </>
  );
}
