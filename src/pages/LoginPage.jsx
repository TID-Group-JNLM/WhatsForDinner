import { useState } from "react";
import { Link, Navigate } from "react-router";
import { logIn } from "../services/authService.js";
import TextField from "../components/TextField.jsx";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const loggedInUser = await logIn(username, password);
      setUser(loggedInUser);
    } catch (logInError) {
      setError(logInError.message);
    }
  }

  if (user && user.hasFamily) return <Navigate to="/mealplan" />;
  if (user) return <Navigate to="/family-registration" />;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <TextField
        id="username"
        label="Username"
        required
        value={username}
        onChange={setUsername}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        required
        value={password}
        onChange={setPassword}
      />
      <button type="submit">Log in</button>
      {error && <p>{error}</p>}
      <Link to="/signup">Create an account</Link>
    </form>
  );
}
