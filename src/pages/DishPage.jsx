import DishList from "../components/DishList";

// Hard-coded until login gives us the user's family
const familyId = "4HG5l3e73W";

export default function DishPage() {
  return (
    <>
      <h1>Dishes</h1>
      <DishList familyId={familyId} />
    </>
  );
}
