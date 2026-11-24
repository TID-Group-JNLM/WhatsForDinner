import { useState } from "react";
import { createShoppingList } from "../../services/shoppingListService.js";
import TextField from "../TextField.jsx";
import { Stack, Typography, Button, Alert } from "@mui/material";

export default function CreateShoppingListForm({ familyId, onCreate }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    // The dates are text like "2026-11-24", so comparing them as text gives the right order
    if (fromDate > toDate) {
      setError("From date can not be after to date");
      return;
    }
    setIsCreating(true);
    try {
      await createShoppingList(familyId, fromDate, toDate);
      await onCreate();
    } catch (createError) {
      console.error(createError);
      setError("Could not create the shopping list");
    }
    setIsCreating(false);
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h6" component="h2">
        New list
      </Typography>
      <TextField
        id="from-date"
        label="From date"
        type="date"
        required
        value={fromDate}
        onChange={setFromDate}
      />
      <TextField
        id="to-date"
        label="To date"
        type="date"
        required
        value={toDate}
        onChange={setToDate}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained" disabled={isCreating}>
        {isCreating ? "Creating list..." : "Create list"}
      </Button>
    </Stack>
  );
}
