import DishList from "../components/DishList";
import { getCurrentUser } from "../services/authService.js";

export default function DishPage() {
  //RequireLogin in App.jsx makes sure there is a user with a family here
  const { familyId } = getCurrentUser();

  return (
    <>
      <h1>Dishes</h1>
      <DishList familyId={familyId} />
    </>
  );
}
