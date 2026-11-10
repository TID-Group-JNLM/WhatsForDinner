import { useState } from "react";
import { Link, Navigate } from "react-router";
import CreateFamilyForm from "../components/FamilyRegistration/CreateFamilyForm.jsx";
import JoinFamilyForm from "../components/FamilyRegistration/JoinFamilyForm.jsx";

export default function FamilyRegistrationPage() {
  const [createdFamily, setCreatedFamily] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  function handleCreate(family) {
    setCreatedFamily(family);
  }

  function handleJoin() {
    setHasJoined(true);
  }

  if (hasJoined) return <Navigate to="/mealplan" />;

  // the parent must see the invite code before moving on, so we don't navigate right away
  if (createdFamily) {
    return (
      <>
        <h1>{createdFamily.familyName} is created</h1>
        <p>Your invite code is {createdFamily.inviteCode}</p>
        <p>
          Give it to your children so they can join the family. You can always
          find it again on the family management page.
        </p>
        <Link to="/mealplan">Continue</Link>
      </>
    );
  }

  return (
    <>
      <h1>Family registration</h1>
      <CreateFamilyForm onCreate={handleCreate} />
      <JoinFamilyForm onJoin={handleJoin} />
    </>
  );
}
