import { useState } from "react";
import { Link as RouterLink, Navigate } from "react-router";
import { logIn } from "../services/authService.js";
import TextField from "../components/TextField.jsx";
import { Stack, Typography, Button, Alert, Link } from "@mui/material";

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
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h5" component="h1">
        Log in
      </Typography>
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
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained">
        Log in
      </Button>
      <Link component={RouterLink} to="/signup" sx={{ alignSelf: "center" }}>
        Create an account
      </Link>
    </Stack>
  );
}
