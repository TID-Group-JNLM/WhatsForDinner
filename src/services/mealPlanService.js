import Parse from "./parse.js";

//Tells which class to retrieve from parse:
const MealPlanEntry = Parse.Object.extend("MealPlanEntry");
const Dish = Parse.Object.extend("Dish");
const Family = Parse.Object.extend("Family");

//The converter turns Parse object into JavaScript object
function toMealPlanEntry(item) {
  const dish = item.get("dish");
  const image = dish.get("image");
  return {
    id: item.id,
    date: item.get("date"),
    dish: {
      id: dish.id,
      name: dish.get("dishName"),
      imageUrl: image ? image.url() : null,
    },
  };
}

//Loads one family's dishes for one week
//Note to remember: Months in JavaScript count from 0 so example new Date(2026, 10, 9) 10 is novemeber not october
export async function loadMealPlan(weekStart, familyId) {
  const weekStartDay = new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate(),
  );
  const weekEnd = new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate() + 7,
  );

  const results = await new Parse.Query(MealPlanEntry)
    .equalTo("family", Family.createWithoutData(familyId))
    .greaterThanOrEqualTo("date", weekStartDay)
    .lessThan("date", weekEnd)
    .include("dish")
    .ascending("date")
    .find();

  return results.map(toMealPlanEntry);
}

//Adds one dish to one day, unless that dish is already planned on that day.
export async function addDishToMealPlan(dishId, date) {
  // Saved at the start of the day:
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dish = await new Parse.Query(Dish).get(dishId);
  const family = dish.get("family");

  //Check if a dish has already been added to the meal plan
  const existingEntry = await new Parse.Query(MealPlanEntry)
    .equalTo("dish", dish)
    .equalTo("date", day)
    .first(); //returns an entry or undefined if there is none

  if (existingEntry) {
    throw new Error("This dish is already planned for that day");
  }

  //Create and then save new MealPlanEntry to the database:
  const entry = new MealPlanEntry();
  entry.set("family", family);
  entry.set("dish", dish);
  entry.set("date", day);

  return toMealPlanEntry(await entry.save());
}

//Delete a dish from the plan
export async function removeDishFromMealPlan(entryId) {
  await MealPlanEntry.createWithoutData(entryId).destroy();
}
