import Parse from "./parse.js";

const Dish = Parse.Object.extend("Dish");
const Family = Parse.Object.extend("Family");

function toDish(parseObject) {
  const file = parseObject.get("image");
  return {
    id: parseObject.id,
    name: parseObject.get("dishName"),
    imageUrl: file ? file.url() : null,
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
