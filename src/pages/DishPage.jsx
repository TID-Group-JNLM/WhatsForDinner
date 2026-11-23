import DishList from "../components/DishList";
import { getCurrentUser } from "../services/authService.js";
import { Stack, Typography } from "@mui/material";

export default function DishPage() {
  const user = getCurrentUser();

  if (!user) return <p>Please log in to see your dishes.</p>;
  if (!user.hasFamily)
    return <p>Create or join a family to see your dishes.</p>;
  //RequireLogin in App.jsx makes sure there is a user with a family here

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h1">
        Dishes
      </Typography>
      <DishList familyId={user.familyId} />
    </Stack>
  );
}
