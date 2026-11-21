import Parse from "./parse.js";
const Family = Parse.Object.extend("Family");
const ShoppingList = Parse.Object.extend("ShoppingList");
const ShoppingListItem = Parse.Object.extend("ShoppingListItem");

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

export async function loadShoppingList(familyId) {
  const familyPointer = Family.createWithoutData(familyId);
  const listQuery = new Parse.Query(ShoppingList);
  listQuery.equalTo("family", familyPointer);
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
