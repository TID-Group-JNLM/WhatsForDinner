import { useState } from "react";
import { joinFamily } from "../../services/familyService.js";
import TextField from "../TextField.jsx";
import { Stack, Typography, Button, Alert } from "@mui/material";

export default function JoinFamilyForm({ onJoin }) {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await joinFamily(inviteCode);
      onJoin();
    } catch (joinError) {
      setError(joinError.message);
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h6" component="h2">
        Join a family
      </Typography>
      <TextField
        id="invite-code"
        label="Invite code"
        required
        value={inviteCode}
        onChange={setInviteCode}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained">
        Join family
      </Button>
    </Stack>
  );
}
