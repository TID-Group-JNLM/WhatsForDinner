import Parse from "./parse.js";
import { fetchFamilyMembers } from "./familyService.js";
import { loadMealsFromToDate } from "./mealPlanService.js";
import { fetchIngredientsForDish } from "./dishService.js";

const Family = Parse.Object.extend("Family");
const ShoppingList = Parse.Object.extend("ShoppingList");
const ShoppingListItem = Parse.Object.extend("ShoppingListItem");
const RECIPE_SERVINGS = 4; // The recipes are written for 4 people.
const Ingredient = Parse.Object.extend("Ingredient");

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
  const members = await fetchFamilyMembers(familyId);
  const membersNr = members.length;
  const factor = membersNr / RECIPE_SERVINGS; // What factor to multiply the recipe with to get right amount for the family

  const totals = {};
  for (const entry of dishEntries) {
    const dishIngredients = await fetchIngredientsForDish(entry.dish.id);
    for (const ingredientRow of dishIngredients) {
      if (totals[ingredientRow.ingredientId] === undefined) {
        totals[ingredientRow.ingredientId] = 0;
      }
      totals[ingredientRow.ingredientId] =
        totals[ingredientRow.ingredientId] + ingredientRow.amount * factor;
    }
    
  }
  const newShoppingList = new ShoppingList();
  const familyPointer = Family.createWithoutData(familyId);
  newShoppingList.set("family", familyPointer);
  newShoppingList.set("fromDate", start);
  newShoppingList.set("toDate", endDate);
  await newShoppingList.save();

  const ingredientIds = Object.keys(totals);

  for (const ingredientId of ingredientIds) {
    const ingredientPointer = Ingredient.createWithoutData(ingredientId);
    const newShoppingListItem = new ShoppingListItem();
    newShoppingListItem.set("shoppingList", newShoppingList);
    newShoppingListItem.set("ingredient", ingredientPointer);
    newShoppingListItem.set("amount", totals[ingredientId]);
    newShoppingListItem.set("checked", false);
    await newShoppingListItem.save();
  }

  return;
}

export async function setItemChecked(itemId, checked) {
  const itemToChange = ShoppingListItem.createWithoutData(itemId);
  itemToChange.set("checked", checked);
  await itemToChange.save();
}
