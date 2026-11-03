import { useEffect } from "react";
import { fetchDishes } from "../services/dishService"; 
import { useState } from "react";

export default function DishPage() {
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [dishes, setDishes] = useState([]);

     useEffect(() => {
  fetchDishes("4HG5l3e73W").then(setDishes)
   .catch((err) => {
    console.error(err);
    setError("Could not load the dishes.");
  })
  .finally(() => setLoading(false));
}, []);

let content;
if (loading){
    content = <p>Loading...</p>
} else if (error){
content = <p>{error}</p>
} else{
 content = <div>
        <ul>
          {dishes.map((dish) => (
            <li key={dish.dishID}>{dish.dishName}</li>
          ))}
        </ul>
    </div>
}


return (
    <>
    <h1>Dishes</h1>
   {content}
   </>
  );
}


