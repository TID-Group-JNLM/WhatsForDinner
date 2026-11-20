import { useState } from "react";
import { Stack, MenuItem, TextField, Button } from "@mui/material";

export default function ChooseDishForm({ dishes, onChoose, buttonLabel }) {
  const [selectedDishId, setSelectedDishId] = useState("");

  function handleSubmit(e) {
    // Stop the browser from reloading the page on submit
    e.preventDefault();
    onChoose(selectedDishId);
    setSelectedDishId("");
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      direction="row"
      spacing={1}
      sx={{ my: 1, alignItems: "center" }}
    >
      <TextField
        select
        label="Choose a dish"
        value={selectedDishId}
        onChange={(e) => setSelectedDishId(e.target.value)}
        sx={{ flexGrow: 1 }}
      >
        {dishes.map((dish) => (
          <MenuItem key={dish.id} value={dish.id}>
            {dish.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" disabled={!selectedDishId}>
        {buttonLabel}
      </Button>
    </Stack>
  );
}
