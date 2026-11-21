import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { loadShoppingList } from "../services/shoppingListService";

export default function ShoppingListPage() {
  const familyId = getCurrentUser().familyId;
  const [shoppingList, setShoppingList] = useState(null);
  const [status, setStatus] = useState("loading");

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

  return (
    <div>
      <h1>Shopping list</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Could not load. Try refreshing the page.</p>}

      {shoppingList === null && status === "ready" && (
        <p>No shopping list created yet</p>
      )}
    </div>
  );
}
