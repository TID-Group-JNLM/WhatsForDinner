import { useState } from "react";
import { createFamily } from "../../services/familyService.js";
import TextField from "../TextField.jsx";
import { Stack, Typography, Button } from "@mui/material";

export default function CreateFamilyForm({ onCreate }) {
  const [familyName, setFamilyName] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const family = await createFamily(familyName);
      onCreate(family);
    } catch (createError) {
      setError(createError.message);
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h6" component="h2">
        Create a family
      </Typography>
      <TextField
        id="family-name"
        label="Family name"
        required
        value={familyName}
        onChange={setFamilyName}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained">
        Create family
      </Button>
    </Stack>
  );
}
