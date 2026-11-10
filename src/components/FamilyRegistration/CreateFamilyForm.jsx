import { useState } from "react";
import { createFamily } from "../../services/familyService.js";
import TextField from "../TextField.jsx";

export default function CreateFamilyForm({ onCreate }) {
  const [familyName, setFamilyName] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const family = await createFamily(familyName);
      onCreate(family);
    } catch (createError) {
      setError(createError.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a family</h2>
      <TextField
        id="family-name"
        label="Family name"
        required
        value={familyName}
        onChange={setFamilyName}
      />
      <button type="submit">Create family</button>
      {error && <p>{error}</p>}
    </form>
  );
}
