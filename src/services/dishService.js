import Parse from "./parse.js";

const Dish = Parse.Object.extend("Dish");
const Family = Parse.Object.extend("Family");
const DishIngredient = Parse.Object.extend("DishIngredient");
const Ingredient = Parse.Object.extend("Ingredient");

function toDish(parseObject) {
  const file = parseObject.get("image");
  return {
    id: parseObject.id,
    name: parseObject.get("dishName"),
    imageUrl: file ? file.url() : null,
    recipe: parseObject.get("recipe"),
  };
}

function toDishIngredient(dishIngredient) {
  const ingredient = dishIngredient.get("ingredient");
  return {
    id: dishIngredient.id,
    name: ingredient.get("ingredientName"),
    unit: ingredient.get("ingredientUnit"),
    amount: dishIngredient.get("amount"),
  };
}

function toIngredient(parseObject) {
  return {
    id: parseObject.id,
    name: parseObject.get("ingredientName"),
  };
}

export async function fetchDishes(familyId) {
  const familyPointer = Family.createWithoutData(familyId);
  const query = new Parse.Query(Dish);
  query.equalTo("family", familyPointer);
  query.ascending("dishName");
  const results = await query.find();

  return results.map(toDish);
}

export async function fetchDish(dishId) {
  const dish = await new Parse.Query(Dish).get(dishId);
  return toDish(dish);
}

export async function fetchIngredientsForDish(dishId) {
  const query = new Parse.Query(DishIngredient);
  query.equalTo("dish", Dish.createWithoutData(dishId));
  query.include("ingredient");
  const results = await query.find();
  return results.map(toDishIngredient);
}

export async function fetchIngredients() {
  const query = new Parse.Query(Ingredient);
  query.ascending("ingredientName");
  const results = await query.find();
  return results.map(toIngredient);
}
