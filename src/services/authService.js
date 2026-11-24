import Parse from "./parse.js";

//turns the Parse user into a plain object with id, name, role, familyId and hasFamily so we avoid using .get on the pages and components
//This way we keep parse related code in the services
function toUser(user) {
  const family = user.get("family");
  return {
    id: user.id,
    name: user.get("name"),
    role: user.get("role"),
    familyId: family ? family.id : null,
    hasFamily: Boolean(family),
  };
}

//returns the logged in user, or null if nobody is logged in.
//Parse remembers the login in the browser, so this also works after a page reload.
export function getCurrentUser() {
  const user = Parse.User.current();
  return user ? toUser(user) : null;
}

//lowercase, so Maria@Gmail.com and maria@gmail.com are the same account
function cleanEmail(email) {
  return email.trim().toLowerCase();
}

//only the first letter is changed, so a name like McDonald is kept as it was typed
function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//"maria møller" becomes "Maria Møller"
function capitalizeWords(text) {
  return text.trim().split(/\s+/).map(capitalizeWord).join(" ");
}

//creates new parse user and saves in back4app
//Parse needs a unique username, so the email is used as username and the name, which does not have to be unique, is saved in its own field
export async function signUp(name, email, password) {
  const user = new Parse.User();
  user.set("username", cleanEmail(email));
  user.set("email", cleanEmail(email));
  user.set("name", capitalizeWords(name));
  user.set("password", password);
  await user.signUp();
  return toUser(user);
}

//asks back4app to check the email and password and returns the logged in user
//the email is the username, see signUp
//parse throws an error if user doesnt exist or password is wrong
export async function logIn(email, password) {
  try {
    const user = await Parse.User.logIn(cleanEmail(email), password);
    return toUser(user);
  } catch (error) {
    //Parse's own message says "username", but our users log in with their email
    if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
      throw new Error("Wrong email or password", { cause: error });
    }
    throw error;
  }
}

export async function logOut() {
  await Parse.User.logOut();
}
