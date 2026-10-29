import Parse from "./parse.js";

const FAMILY_CLASS = "Family"; // renaming to make it clear that Family is a class/table in back4app
const  DISH_CLASS = "Dish"; // see above
const COLUMN = {dishName : "dishName", family : "family"}; // the columns of  DISH_CLASS

function toDish(parseObject) {
    return {dishID: parseObject.id, dishName: parseObject.get(COLUMN.dishName)} // add imageURL later
}

export async function fetchDishes(familyId){
    const familyPointer = Parse.Object.extend(FAMILY_CLASS).createWithoutData(familyId);
    const query = new Parse.Query(DISH_CLASS)
        .equalTo(COLUMN.family, familyPointer)
        .ascending(COLUMN.dishName);
    const results = await query.find();
    
    return results.map(toDish);
}
