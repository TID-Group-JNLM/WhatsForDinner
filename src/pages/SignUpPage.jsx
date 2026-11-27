import { useState } from "react";
import { Link as RouterLink, Navigate } from "react-router";
import { signUp } from "../services/authService.js";
import TextField from "../components/TextField.jsx";
import { Stack, Typography, Button, Alert, Link } from "@mui/material";

//each usestate gives us the current value an a function to change it. when called, react draws the page again with the new value
export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); //null until sign up is done

  //we use async because we have to await the call to back4app inside
  async function handleSubmit(event) {
    event.preventDefault(); //avoiding the defaul reload of a form
    setError(""); //removes old errros before trying again
    try {
      const newUser = await signUp(name, email, password);
      setUser(newUser); //create new user and render page again
    } catch (signUpError) {
      setError(signUpError.message); //store the error message
    }
  }

  if (user) return <Navigate to="/family-registration" />;

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <Typography variant="h5" component="h1">
        Sign up
      </Typography>
      <TextField
        id="name"
        label="Name"
        required
        value={name}
        onChange={setName}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        required
        value={email}
        onChange={setEmail}
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
        Sign up
      </Button>

      <Typography sx={{ alignSelf: "center" }}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/">
          Log in
        </Link>
      </Typography>
    </Stack>
  );
}
