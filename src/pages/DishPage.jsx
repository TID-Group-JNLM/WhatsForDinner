import { useEffect } from "react";
import { fetchDishes } from "../services/dishService"; 
import { useState } from "react";

export default function DishPage() {

const [dishes, setDishes] = useState([]);

     useEffect(() => {
  fetchDishes("4HG5l3e73W").then(setDishes);
}, []);



  return (
  <div>
    <h1>Dishes</h1>
<ul>
    {dishes.map((dish) => (
        <li key={dish.dishID}>{dish.dishName}</li>
    ))}
</ul>
  </div>);
}
                 


