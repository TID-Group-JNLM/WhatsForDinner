import { HashRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import FamilyRegistrationPage from "./pages/FamilyRegistrationPage.jsx";
import FamilyManagementPage from "./pages/FamilyManagementPage.jsx";
import DishPage from "./pages/DishPage.jsx";
import MealPlanPage from "./pages/MealPlanPage.jsx";
import ShoppingListPage from "./pages/ShoppingListPage.jsx";
import DishDetailPage from "./pages/DishDetailPage.jsx";
import { RequireLogin, RequireLoggedOut } from "./components/LoginCheck.jsx";
import AppLayout from "./components/AppLayout.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

// To open a page directly, add its path after "#":
//   local:  http://localhost:5173/WhatsForDinner/#/dishes
//   live:   https://tid-group-jnlm.github.io/WhatsForDinner/#/dishes

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Pages before the user is in the app share AuthLayout, without the nav bar */}
        <Route element={<AuthLayout />}>
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
        </Route>
        {/* Pages that need a family share AppLayout, which shows the nav bar */}
        <Route
          element={
            <RequireLogin needsFamily>
              <AppLayout />
            </RequireLogin>
          }
        >
          <Route path="/mealplan" element={<MealPlanPage />} />
          <Route path="/shopping" element={<ShoppingListPage />} />
          <Route path="/dishes" element={<DishPage />} />
          <Route path="/dishes/:dishId" element={<DishDetailPage />} />
          <Route path="/family-management" element={<FamilyManagementPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
