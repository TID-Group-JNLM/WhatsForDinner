import { useEffect } from "react";
import { fetchDishes } from "../services/dishService"; 
import { useState } from "react";
import DishCard from "../components/DishCard";

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
} else if(dishes.length === 0){
    content = <p>There are no dishes.</p>
} else{
 content = <div>
        <div>
          {dishes.map((dish) => (
           < DishCard key={dish.dishID} dish = {dish}/>
          ))}
        </div>
    </div>
}


return (
    <>
    <h1>Dishes</h1>
   {content}
   </>
  );
}


