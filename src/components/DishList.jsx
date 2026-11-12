import { useEffect } from "react";
import { useState } from "react";
import DishCard from "./DishCard";
import { fetchDishes } from "../services/dishService";

export default function DishList({ familyId }) {
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchDishes(familyId)
      .then((result) => {
        setDishes(result);
        setStatus("ready");
      })
      .catch(() => setStatus("failed"));
  }, [familyId]);

  if (status === "loading") return <p>Loading dishes...</p>;
  if (status === "failed") return <p>Could not load dishes.</p>;
  if (dishes.length === 0) return <p>There are no dishes.</p>;

  return (
    <div>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
