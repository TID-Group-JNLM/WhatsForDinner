import { useState } from "react";

export default function AddDishForm({ dishes, onChoose, buttonLabel }) {
  const [selectedDishId, setSelectedDishId] = useState("");

  function handleSubmit(e) {
    // Stop the browser from reloading the page on submit
    e.preventDefault();
    onChoose(selectedDishId);
    setSelectedDishId("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedDishId}
        onChange={(e) => setSelectedDishId(e.target.value)}
      >
        {/* Matches the starting state "", so nothing looks chosen until the user picks a dish */}
        <option value="">Choose a dish</option>
        {dishes.map((dish) => (
          <option key={dish.id} value={dish.id}>
            {dish.name}
          </option>
        ))}
      </select>
      <button disabled={!selectedDishId}>{buttonLabel}</button>
    </form>
  );
}
