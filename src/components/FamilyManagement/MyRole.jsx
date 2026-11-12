import { useState } from "react";
import { changeOwnRole } from "../../services/familyService.js";

//shows who is logged in and lets them change their own role
//the role is saved as soon as a new one is picked
export default function MyRole({ me, onRoleChange }) {
  const [error, setError] = useState("");

  async function handleChange(event) {
    const role = event.target.value;
    setError("");
    try {
      await changeOwnRole(role);
      onRoleChange(role);
    } catch (roleError) {
      setError(roleError.message);
    }
  }

  return (
    <section>
      <p>You are logged in as {me.username}</p>
      <label htmlFor="my-role">Your role</label>
      <select id="my-role" value={me.role} onChange={handleChange}>
        <option value="parent">parent</option>
        <option value="child">child</option>
      </select>
      {error && <p>{error}</p>}
    </section>
  );
}
