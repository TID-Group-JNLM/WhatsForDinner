import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Parse from "parse";

//This is how we connect with back4app:
Parse.initialize(
  //application id:
  "BV6g0EzwXzepQpbZPQt4zUO66zBe6ZyrNHxkr5Oy",
  //javascript key:
  "5z9jlgvOGEFJsjDqBtBsQF6XYFmYrGGYKAg0t282",
);
Parse.serverURL = "https://parseapi.back4app.com/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
