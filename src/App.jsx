import { HashRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import FamilyRegistrationPage from "./pages/FamilyRegistrationPage.jsx";
import FamilyManagementPage from "./pages/FamilyManagementPage.jsx";
import DishPage from "./pages/DishPage.jsx";
import MealPlanPage from "./pages/MealPlanPage.jsx";
import ShoppingListPage from "./pages/ShoppingListPage.jsx";

// To open a page directly, add its path after "#":
//   local:  http://localhost:5173/WhatsForDinner/#/dishes
//   live:   https://tid-group-jnlm.github.io/WhatsForDinner/#/dishes

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/family-registration"
          element={<FamilyRegistrationPage />}
        />
        <Route path="/family-management" element={<FamilyManagementPage />} />
        <Route path="/dishes" element={<DishPage />} />
        <Route path="/mealplan" element={<MealPlanPage />} />
        <Route path="/shopping" element={<ShoppingListPage />} />
      </Routes>
    </HashRouter>
  );
}
