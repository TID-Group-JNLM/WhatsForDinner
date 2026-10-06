import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Parse from "parse";

//This is how we connect with back4app:
Parse.initialize(
  //application id:
  "ewWLcDYiv9tzZ1GMOHtc9LHBW3BXkPv7iBaix29N",
  //javascript key:
  "Vu2rFjGzpl9R08ha0D1C78D7urTW1yiVh9JpqJpo",
);
Parse.serverURL = "https://parseapi.back4app.com/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
