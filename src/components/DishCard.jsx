export default function DishCard({ dish }) {
  return (
    <div>
      {dish.imageUrl && <img src={dish.imageUrl} alt={dish.name} />}
      <p>{dish.name}</p>
    </div>
  );
}
