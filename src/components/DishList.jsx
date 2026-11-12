import { useEffect } from "react";
import { useState } from "react";
import DishCard from "./DishCard";
import { fetchDishes, fetchIngredients } from "../services/dishService";
import IngredientFilter from "./IngredientFilter";

export default function DishList({ familyId }) {
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
  async function load() {
    try {
      setDishes(await fetchDishes(familyId));
      setIngredients(await fetchIngredients());
      setStatus("ready");
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  }
  load();
}, [familyId]);

function handleToggle(id) {
  if (selectedIds.includes(id)) {
    setSelectedIds(selectedIds.filter((each) => each !== id));
  } else {
    setSelectedIds([...selectedIds, id]);
  }
}

  if (status === "loading") return <p>Loading dishes...</p>;
  if (status === "failed") return <p>Could not load dishes.</p>;
  if (dishes.length === 0) return <p>There are no dishes.</p>;

  return (
    <>
    <IngredientFilter 
    ingredients={ingredients} 
    selectedIds={selectedIds} 
    onToggle={handleToggle}
    />
    <div>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
    </>
  );
}
