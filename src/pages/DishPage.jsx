import DishList from "../components/DishList";
import { getCurrentUser } from "../services/authService.js";

export default function DishPage() {
  const user = getCurrentUser();

  if (!user) return <p>Please log in to see your dishes.</p>;
  if (!user.hasFamily) return <p>Create or join a family to see your dishes.</p>
  //RequireLogin in App.jsx makes sure there is a user with a family here
  

  return (
    <>
      <h1>Dishes</h1>
      <DishList familyId={user.familyId} />
    </>
  );
}
