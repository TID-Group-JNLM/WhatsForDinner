import { useState } from "react";

export default function AddDishForm({ dishes, onAdd }) {
  const [selectedDishId, setSelectedDishId] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); //so browser does not reload the page when the form is submitted
    onAdd(selectedDishId);
    setSelectedDishId("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        aria-label="Choose a dish"
        value={selectedDishId}
        onChange={(e) => setSelectedDishId(e.target.value)}
      >
        <option value="">Choose a dish</option>
        {dishes.map((dish) => (
          <option key={dish.id} value={dish.id}>
            {dish.name}
          </option>
        ))}
      </select>
      <button disabled={!selectedDishId}>Add</button>
    </form>
  );
}
