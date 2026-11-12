import { HashRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import FamilyRegistrationPage from "./pages/FamilyRegistrationPage.jsx";
import FamilyManagementPage from "./pages/FamilyManagementPage.jsx";
import DishPage from "./pages/DishPage.jsx";
import MealPlanPage from "./pages/MealPlanPage.jsx";
import ShoppingListPage from "./pages/ShoppingListPage.jsx";
import { RequireLogin, RequireLoggedOut } from "./components/LoginCheck.jsx";

// To open a page directly, add its path after "#":
//   local:  http://localhost:5173/WhatsForDinner/#/dishes
//   live:   https://tid-group-jnlm.github.io/WhatsForDinner/#/dishes

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireLoggedOut>
              <LoginPage />
            </RequireLoggedOut>
          }
        />
        <Route
          path="/signup"
          element={
            <RequireLoggedOut>
              <SignUpPage />
            </RequireLoggedOut>
          }
        />
        <Route
          path="/family-registration"
          element={
            <RequireLogin needsNoFamily>
              <FamilyRegistrationPage />
            </RequireLogin>
          }
        />
        <Route
          path="/family-management"
          element={
            <RequireLogin needsFamily>
              <FamilyManagementPage />
            </RequireLogin>
          }
        />
        <Route
          path="/dishes"
          element={
            <RequireLogin needsFamily>
              <DishPage />
            </RequireLogin>
          }
        />
        <Route
          path="/mealplan"
          element={
            <RequireLogin needsFamily>
              <MealPlanPage />
            </RequireLogin>
          }
        />
        <Route
          path="/shopping"
          element={
            <RequireLogin needsFamily>
              <ShoppingListPage />
            </RequireLogin>
          }
        />
      </Routes>
    </HashRouter>
  );
}
