import { useState } from "react";
import { Navigate } from "react-router";
import { logOut } from "../services/authService.js";

export default function LogOutButton() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setError("");
    try {
      await logOut();
      setIsLoggedOut(true);
    } catch (logOutError) {
      setError(logOutError.message);
    }
  }

  if (isLoggedOut) return <Navigate to="/" />;

  return (
    <>
      <button onClick={handleClick}>Log out</button>
      {error && <p>{error}</p>}
    </>
  );
}
