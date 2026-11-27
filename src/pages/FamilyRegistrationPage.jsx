import { useState } from "react";
import { Link as RouterLink, Navigate } from "react-router";
import CreateFamilyForm from "../components/FamilyRegistration/CreateFamilyForm.jsx";
import JoinFamilyForm from "../components/FamilyRegistration/JoinFamilyForm.jsx";
import { Stack, Typography, Card, Button } from "@mui/material";

export default function FamilyRegistrationPage() {
  const [createdFamily, setCreatedFamily] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  function handleCreate(family) {
    setCreatedFamily(family);
  }

  function handleJoin() {
    setHasJoined(true);
  }

  if (hasJoined) return <Navigate to="/mealplan" />;

  // the parent must see the invite code before moving on, so we don't navigate right away
  if (createdFamily) {
    return (
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          {createdFamily.familyName} is created
        </Typography>
        <Typography>Your invite code is</Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ fontWeight: 700, letterSpacing: 2 }}
        >
          {createdFamily.inviteCode}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Give it to your children so they can join the family. You can always
          find it again on the family management page.
        </Typography>
        <Button component={RouterLink} to="/mealplan" variant="contained">
          Continue
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" component="h1">
        Family registration
      </Typography>
      <Card variant="outlined" sx={{ p: 2 }}>
        <CreateFamilyForm onCreate={handleCreate} />
      </Card>
      <Card variant="outlined" sx={{ p: 2 }}>
        <JoinFamilyForm onJoin={handleJoin} />
      </Card>
    </Stack>
  );
}
