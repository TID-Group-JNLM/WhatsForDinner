//Wrappers for the routes in App.jsx. They check who is logged in before a page is shown,
//and send the user to the right page if they are not allowed to be there.
import { Navigate } from "react-router";
import { getCurrentUser } from "../services/authService.js";

//For pages that need a logged in user.
//With needsFamily, the user must also be part of a family, otherwise they go to family registration.
export function RequireLogin({ needsFamily = false, children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/" replace />;
  if (needsFamily && !user.hasFamily) {
    return <Navigate to="/family-registration" replace />;
  }
  return children;
}

//For the login and sign up pages. A user who is already logged in skips them.
export function RequireLoggedOut({ children }) {
  const user = getCurrentUser();
  if (user && user.hasFamily) return <Navigate to="/mealplan" replace />;
  if (user) return <Navigate to="/family-registration" replace />;
  return children;
}
