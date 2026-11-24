import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../services/authService.js";
import {
  loadShoppingList,
  setItemChecked,
  groupByCategory,
} from "../services/shoppingListService.js";
import CreateShoppingListForm from "../components/ShoppingList/CreateShoppingListForm.jsx";
import ShoppingListCategory from "../components/ShoppingList/ShoppingListCategory.jsx";
import { Stack, Typography, Alert } from "@mui/material";

// The list is shared by the whole family. We fetch it again this often,
// so ticks made by the others show up without reloading the page
const RELOAD_EVERY_MS = 15000;

function formatDate(date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// Returns a copy of the list where one item has a new checked value
function withItemChecked(list, itemId, checked) {
  return {
    ...list,
    items: list.items.map((item) =>
      item.id === itemId ? { ...item, checked } : item,
    ),
  };
}

export default function ShoppingListPage() {
  //RequireLogin in App.jsx makes sure there is a user with a family here
  const { familyId } = getCurrentUser();
  const [shoppingList, setShoppingList] = useState(null);
  const [status, setStatus] = useState("loading");
  const [tickError, setTickError] = useState("");

  // useRef keeps a value between renders without drawing the page again when it changes.
  // Both are used so a reload can't undo a tick that is newer than the data it fetched
  const savesInProgress = useRef(0); // ticks that are not saved in Back4App yet
  const tickCount = useRef(0); // goes up by one on every tick on this phone

  async function reloadList() {
    const tickCountAtStart = tickCount.current;
    const list = await loadShoppingList(familyId);
    // If someone ticked while we were loading, or a tick is still saving,
    // the fetched list may be older than the screen, so we throw it away
    if (
      tickCount.current === tickCountAtStart &&
      savesInProgress.current === 0
    ) {
      setShoppingList(list);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        setShoppingList(await loadShoppingList(familyId));
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }
    load();

    // Only reload while the page is visible, and right away when the user comes back to the app.
    // A failed reload is ignored: the list on screen is kept and the next reload tries again
    async function reloadIfVisible() {
      if (document.visibilityState !== "visible") return;
      try {
        await reloadList();
      } catch (error) {
        console.error(error);
      }
    }
    const intervalId = setInterval(reloadIfVisible, RELOAD_EVERY_MS);
    document.addEventListener("visibilitychange", reloadIfVisible);

    // Runs when the user leaves the page, so we stop reloading in the background
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", reloadIfVisible);
    };
    // reloadList only depends on familyId, so it is left out here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyId]);

  async function handleCreated() {
    setTickError("");
    setShoppingList(await loadShoppingList(familyId));
  }

  async function handleToggle(itemId, checked) {
    setTickError("");
    tickCount.current += 1;
    savesInProgress.current += 1;
    // Show the tick right away, then save it.
    // setShoppingList gets a function, so it always changes the newest list,
    // even if a reload replaced it while we were waiting
    setShoppingList((list) => withItemChecked(list, itemId, checked));
    try {
      await setItemChecked(itemId, checked);
    } catch (error) {
      console.error(error);
      // Undo the tick on screen, because it was not saved
      setShoppingList((list) => withItemChecked(list, itemId, !checked));
      setTickError("Could not save the tick. Try again");
    }
    savesInProgress.current -= 1;
  }

  if (status === "loading") return <p>Loading the shopping list...</p>;
  if (status === "failed")
    return <p>Could not load. Try refreshing the page.</p>;

  const categories = shoppingList ? groupByCategory(shoppingList.items) : [];

  return (
    <Stack spacing={3}>
      <Typography variant="h5" component="h1">
        Shopping list
      </Typography>

      <CreateShoppingListForm familyId={familyId} onCreate={handleCreated} />

      {shoppingList === null && (
        <Typography sx={{ color: "text.secondary" }}>
          No shopping list created yet
        </Typography>
      )}

      {shoppingList !== null && (
        <Typography sx={{ color: "text.secondary" }}>
          For {formatDate(shoppingList.fromDate)} –{" "}
          {formatDate(shoppingList.toDate)}
        </Typography>
      )}

      {shoppingList !== null && categories.length === 0 && (
        <Typography sx={{ color: "text.secondary" }}>
          Nothing to buy in this period
        </Typography>
      )}

      {tickError && <Alert severity="error">{tickError}</Alert>}

      {categories.map((category) => (
        <ShoppingListCategory
          key={category.key}
          label={category.label}
          items={category.items}
          onToggle={handleToggle}
        />
      ))}
    </Stack>
  );
}
