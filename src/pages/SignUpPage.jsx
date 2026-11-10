import { useState } from "react";
import { Navigate } from "react-router";
import { signUp } from "../services/authService.js";
import TextField from "../components/TextField.jsx";

//each usestate gives us the current value an a function to change it. when called, react draws the page again with the new value
export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); //null until sign up is done

  //we use async because we have to await the call to back4app inside
  async function handleSubmit(event) {
    event.preventDefault(); //avoiding the defaul reload of a form
    setError(""); //removes old errros before trying again
    try {
      const newUser = await signUp(username, email, password);
      setUser(newUser); //create new user and render page again
    } catch (signUpError) {
      setError(signUpError.message); //store the error message
    }
  }

  if (user) return <Navigate to="/family-registration" />;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={setUsername}
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
        value={password}
        onChange={setPassword}
      />
      <button type="submit">Sign up</button>
      {error && <p>{error}</p>}
    </form>
  );
}
