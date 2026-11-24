import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import {
  loadShoppingList,
  setItemChecked,
  createShoppingList,
} from "../services/shoppingListService";

export default function ShoppingListPage() {
  const familyId = getCurrentUser().familyId;
  const [shoppingList, setShoppingList] = useState(null);
  const [status, setStatus] = useState("loading");
  const [fromDateInput, setFromDateInput] = useState("");
  const [toDateInput, setToDateInput] = useState("");
  const [dateInputError, setDateInputError] = useState("");
  const [createError, setCreateError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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

  async function handleCreateShoppingList(event) {
    event.preventDefault();
    setDateInputError("");
    setCreateError("");
    if (fromDateInput > toDateInput) {
      setDateInputError("From Date can not be after To Date");

      return;
    }
    setIsCreating(true);
    try {
      await createShoppingList(familyId, fromDateInput, toDateInput);
      const newList = await loadShoppingList(familyId);
      setShoppingList(newList);
      setStatus("ready");
    } catch (error) {
      setCreateError("Could not create new Shopping List");
    }
    setIsCreating(false);
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
        <button type="submit" disabled={isCreating}>
          Create List
        </button>
      </form>
      {isCreating && <p>Creating Shopping List</p>}
      {dateInputError && <p>{dateInputError}</p>}
      {createError && <p>{createError}</p>}

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Could not load. Try refreshing the page.</p>}

      {status === "ready" && shoppingList === null && !isCreating && (
        <p>No shopping list created yet</p>
      )}

      {status === "ready" &&
        shoppingList !== null &&
        shoppingList.items.length === 0 &&
        !isCreating && <p>Nothing to buy in this period</p>}

      {status === "ready" &&
        shoppingList !== null &&
        shoppingList.items.length > 0 &&
        !isCreating && (
          <ul>
            {shoppingList.items.map((item) => (
              <li key={item.id}>
                {item.name}
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) => handleToggle(item)}
                ></input>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
