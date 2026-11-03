import { useEffect } from "react";
import { fetchDishes } from "../services/dishService"; 
import { useState } from "react";

export default function DishPage() {
const [loading, setLoading] = useState(true);
const [dishes, setDishes] = useState([]);

     useEffect(() => {
  fetchDishes("4HG5l3e73W").then(setDishes)
  .finally(() => setLoading(false));
}, []);




return (
    <div>
      <h1>Dishes</h1>
      {loading ? 
        <p>Loading...</p>
       : 
        <ul>
          {dishes.map((dish) => (
            <li key={dish.dishID}>{dish.dishName}</li>
          ))}
        </ul>
      }
    </div>
  );
}


