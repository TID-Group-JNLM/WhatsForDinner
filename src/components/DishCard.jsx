import { Link } from "react-router";

export default function DishCard({ dish }) {
  return (
    <Link to={`/dishes/${dish.id}`}>
      {dish.imageUrl && <img src={dish.imageUrl} alt={dish.name} />}
      <p>{dish.name}</p>
    </Link>
  );
}
