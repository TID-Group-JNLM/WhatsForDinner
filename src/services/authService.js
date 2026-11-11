import Parse from "./parse.js";

//turns the Parse user into a plain object with id, username, familyId and hasFamily so we avoid using .get on the pages and components
//This way we keep parse related code in the services
function toUser(user) {
  const family = user.get("family");
  return {
    id: user.id,
    username: user.get("username"),
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

//creates new parse user and saves in back4app
//copied from course notes
export async function signUp(username, email, password) {
  const user = new Parse.User();
  user.set("username", username);
  user.set("email", email);
  user.set("password", password);
  await user.signUp();
  return toUser(user);
}

//asks back4app to check the username and password and returns the logged in user
//parse throws an error if user doesnt exist or password is wrong
export async function logIn(username, password) {
  const user = await Parse.User.logIn(username, password);
  return toUser(user);
}

export async function logOut() {
  await Parse.User.logOut();
}
