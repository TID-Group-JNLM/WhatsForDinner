import Parse from "parse";

//This is how we connect with back4app:
Parse.initialize(
  //application id:
  "BV6g0EzwXzepQpbZPQt4zUO66zBe6ZyrNHxkr5Oy",
  //javascript key:
  "5z9jlgvOGEFJsjDqBtBsQF6XYFmYrGGYKAg0t282",
);
Parse.serverURL = "https://parseapi.back4app.com/";

// lets all the other service files get the already-configured Parse from here
export default Parse;