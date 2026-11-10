import { useState } from "react";
import { joinFamily } from "../../services/familyService.js";
import TextField from "../TextField.jsx";

export default function JoinFamilyForm({ onJoin }) {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      await joinFamily(inviteCode);
      onJoin();
    } catch (joinError) {
      setError(joinError.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join a family</h2>
      <TextField
        id="invite-code"
        label="Invite code"
        required
        value={inviteCode}
        onChange={setInviteCode}
      />
      <button type="submit">Join family</button>
      {error && <p>{error}</p>}
    </form>
  );
}
