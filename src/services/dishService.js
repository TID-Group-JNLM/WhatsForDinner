import Parse from "./parse.js";

const FAMILY_CLASS = "Family"; // renaming to make it clear that Family is a class/table in back4app
const DISH_CLASS = "Dish"; // as above
const COLUMN = {dishName : "dishName", family : "family", image : "image"}; // the columns of  DISH_CLASS

function toDish(parseObject) {
    const file = parseObject.get(COLUMN.image);
    return {
        id: parseObject.id, 
        name: parseObject.get(COLUMN.dishName),
        imageUrl: file ? file.url() : null};
}

export async function fetchDishes(familyId){
    const familyPointer = Parse.Object.extend(FAMILY_CLASS).createWithoutData(familyId);
    const query = new Parse.Query(DISH_CLASS)
        .equalTo(COLUMN.family, familyPointer)
        .ascending(COLUMN.dishName);
    const results = await query.find();
    
    return results.map(toDish);
}
