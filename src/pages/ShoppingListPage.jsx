import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { loadShoppingList } from "../services/shoppingListService";
import { setItemChecked } from "../services/shoppingListService";

export default function ShoppingListPage() {
  const familyId = getCurrentUser().familyId;
  const [shoppingList, setShoppingList] = useState(null);
  const [status, setStatus] = useState("loading");
  const [fromDateInput, setFromDateInput] = useState("");
  const [toDateInput, setToDateInput] = useState("");
  const [dateInputError, setDateInputError] = useState("");

  useEffect(() => {
    loadShoppingList(familyId)
      .then((result) => {
        setShoppingList(result);
        setStatus("ready");
      })
      .catch(() => {
        setStatus("failed");
      });
  }, [familyId]);

  async function handleToggle(item) {
    await setItemChecked(item.id, !item.checked);
  }

  function handleCreateShoppingList(event) {
    event.preventDefault();
    setDateInputError("");
    if (fromDateInput > toDateInput) {
      setDateInputError("From Date can not be after To Date");
      return;
    }
  }

  return (
    <div>
      <h1>Shopping list</h1>
      <form onSubmit={handleCreateShoppingList}>
        <label htmlFor="from-date-input">From Date</label>
        <input
          required
          id="from-date-input"
          name="fromDate"
          type="date"
          value={fromDateInput}
          onChange={(event) => setFromDateInput(event.target.value)}
        />

        <label htmlFor="to-date-input">To Date</label>
        <input
          required
          id="to-date-input"
          name="toDate"
          type="date"
          value={toDateInput}
          onChange={(event) => setToDateInput(event.target.value)}
        />
        <button type="submit">Create List</button>
      </form>
      {dateInputError && <p>{dateInputError}</p>}

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Could not load. Try refreshing the page.</p>}

      {status === "ready" && shoppingList === null && (
        <p>No shopping list created yet</p>
      )}
      {status === "ready" && shoppingList !== null && (
        <ul>
          {shoppingList.items.map((item) => (
            <li key={item.id}>
              {item.name}
              <input type="checkbox" checked={item.checked} onChange={(event) => handleToggle(item)}></input>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
