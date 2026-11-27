import Parse from "./parse.js";
import { fetchFamilyMembers } from "./familyService.js";
import { loadMealsFromToDate } from "./mealPlanService.js";
import { fetchIngredientsForDish } from "./dishService.js";

const Family = Parse.Object.extend("Family");
const Ingredient = Parse.Object.extend("Ingredient");
const ShoppingList = Parse.Object.extend("ShoppingList");
const ShoppingListItem = Parse.Object.extend("ShoppingListItem");

const RECIPE_SERVINGS = 4; // The recipes are written for 4 people.

// key = what is stored in Ingredient.category in Back4App, label = what the user sees.
// The categories are shown in this order, roughly the way you walk through a store.
const CATEGORIES = [
  { key: "vegetablesAndFruits", label: "Vegetables & fruits" },
  { key: "meatAndFish", label: "Meat & fish" },
  { key: "dairy", label: "Dairy" },
  { key: "frozen", label: "Frozen" },
  { key: "pantry", label: "Pantry" },
  { key: "other", label: "Other" },
];

function toShoppingListItem(item) {
  const ingredient = item.get("ingredient");
  return {
    id: item.id,
    name: ingredient.get("ingredientName"),
    unit: ingredient.get("ingredientUnit"),
    category: ingredient.get("category"),
    amount: item.get("amount"),
    checked: item.get("checked"),
  };
}

function dateFromInput(dateInput) {
  const dateParts = dateInput.split("-");
  const year = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1;
  const day = Number(dateParts[2]);
  const date = new Date(year, month, day);
  return date;
}

// A category key that is not in CATEGORIES (a typo, or a new one) counts as "other",
// so the item is still shown
function categoryKeyOf(item) {
  const isKnown = CATEGORIES.some((category) => category.key === item.category);
  return isKnown ? item.category : "other";
}

// Turns a flat list of items into [{ key, label, items }], one entry per category.
// Categories without items are left out. Items are sorted by name inside each category.
export function groupByCategory(items) {
  const groups = [];
  for (const category of CATEGORIES) {
    const categoryItems = items
      .filter((item) => categoryKeyOf(item) === category.key)
      .sort((a, b) => a.name.localeCompare(b.name));
    if (categoryItems.length > 0) {
      groups.push({
        key: category.key,
        label: category.label,
        items: categoryItems,
      });
    }
  }
  return groups;
}

export async function loadShoppingList(familyId) {
  const familyPointer = Family.createWithoutData(familyId);
  const listQuery = new Parse.Query(ShoppingList);
  listQuery.equalTo("family", familyPointer);
  listQuery.descending("createdAt");
  const list = await listQuery.first();
  if (!list) {
    return null;
  }
  const itemQuery = new Parse.Query(ShoppingListItem);
  itemQuery.equalTo("shoppingList", list);
  itemQuery.include("ingredient");
  const itemRows = await itemQuery.find();

  return {
    fromDate: list.get("fromDate"),
    toDate: list.get("toDate"),
    items: itemRows.map(toShoppingListItem),
  };
}

export async function createShoppingList(familyId, fromDate, toDate) {
  const start = dateFromInput(fromDate);
  const endDate = dateFromInput(toDate);
  const endPlusOne = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate() + 1,
  );
  const dishEntries = await loadMealsFromToDate(start, endPlusOne, familyId);
  const members = await fetchFamilyMembers();
  const membersNr = members.length;
  const factor = membersNr / RECIPE_SERVINGS; // What factor to multiply the recipe with to get right amount for the family

  const ingredientLists = await Promise.all( // Running fetchIngredientsForDish in parallell for speed.
    dishEntries.map((entry) => fetchIngredientsForDish(entry.dish.id)),
  );
  const totals = {};
  for (const dishIngredients of ingredientLists) {
    for (const ingredientRow of dishIngredients) {
      if (totals[ingredientRow.ingredientId] === undefined) {
        totals[ingredientRow.ingredientId] = 0;
      }
      totals[ingredientRow.ingredientId] =
        totals[ingredientRow.ingredientId] + ingredientRow.amount * factor;
    }
  }

  const newShoppingList = new ShoppingList();
  newShoppingList.set("family", Family.createWithoutData(familyId));
  newShoppingList.set("fromDate", start);
  newShoppingList.set("toDate", endDate);

  const newItems = Object.keys(totals).map((ingredientId) => {
    const newItem = new ShoppingListItem();
    newItem.set("shoppingList", newShoppingList);
    newItem.set("ingredient", Ingredient.createWithoutData(ingredientId));
    newItem.set("amount", totals[ingredientId]);
    newItem.set("checked", false);
    return newItem;
  });

  // Saves the list and all its items together instead of one request per item.
  // It is not a transaction: if the connection drops, some rows can still be missing.
  await Parse.Object.saveAll([newShoppingList, ...newItems]);
}

export async function setItemChecked(itemId, checked) {
  const itemToChange = ShoppingListItem.createWithoutData(itemId);
  itemToChange.set("checked", checked);
  await itemToChange.save();
}
