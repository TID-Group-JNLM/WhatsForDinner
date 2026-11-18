import { useEffect } from "react";
import { useState } from "react";
import DishCard from "./DishCard";
import { fetchDishes, fetchIngredients, fetchDishIdsWithAllIngredients} from "../services/dishService";
import IngredientFilter from "./IngredientFilter";

export default function DishList({ familyId }) {
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [matchingIds, setMatchingIds] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ready");

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

  useEffect(() => {
    if (selectedIds.length === 0) {
      setMatchingIds(null);
      setFilterStatus("ready");
      return;
    }
    setFilterStatus("loading");
    fetchDishIdsWithAllIngredients(selectedIds)
      .then((result) => {
        setMatchingIds(result);
        setFilterStatus("ready");
      })
      .catch(() => setFilterStatus("failed"));
  }, [selectedIds]);

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

  const shownDishes =
    matchingIds === null
      ? dishes
      : dishes.filter((dish) => matchingIds.includes(dish.id));

  let content;
  if (filterStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (filterStatus === "failed") {
    content = <p>Could not filter the dishes.</p>;
  } else if (shownDishes.length === 0) {
    content = <p>No dishes contain all of these ingredients.</p>;
  } else {
    content = (
      <div>
        {shownDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    );
  }

  return (
    <>
      <IngredientFilter
        ingredients={ingredients}
        selectedIds={selectedIds}
        onToggle={handleToggle}
      />
      {content}
    </>
  );
}
