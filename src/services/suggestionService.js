import Parse from "./parse.js";

const DishSuggestion = Parse.Object.extend("DishSuggestion");
const Dish = Parse.Object.extend("Dish");
const Family = Parse.Object.extend("Family");

function toSuggestion(item) {
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

export async function loadSuggestions(weekStart, familyId) {
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

  const results = await new Parse.Query(DishSuggestion)
    .equalTo("family", Family.createWithoutData(familyId))
    .greaterThanOrEqualTo("date", weekStartDay)
    .lessThan("date", weekEnd)
    .include("dish")
    .ascending("date")
    .find();

  return results.map(toSuggestion);
}

export async function removeSuggestion(suggestionId) {
  await DishSuggestion.createWithoutData(suggestionId).destroy();
}

export async function suggestDish(dishId, date) {
  // Saved at the start of the day:
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dish = await new Parse.Query(Dish).get(dishId);
  // Stored on the suggestion, even though the user's family says the same,
  // because Parse can't filter through the user pointer with equalTo
  const family = dish.get("family");
  const user = Parse.User.current();

  // A child may suggest only one dish per day.
  // A range, so a suggestion saved at another time of day is also found.
  const existingSuggestion = await new Parse.Query(DishSuggestion)
    .equalTo("user", user)
    .equalTo("date", day)
    .first();

  if (existingSuggestion) {
    throw new Error("You have already suggested a dish for this day");
  }

  const suggestion = new DishSuggestion();
  suggestion.set("user", user);
  suggestion.set("dish", dish);
  suggestion.set("date", day);
  suggestion.set("family", family);

  return toSuggestion(await suggestion.save());
}
