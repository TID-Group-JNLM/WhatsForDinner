import { useEffect, useState } from "react";
import LogOutButton from "../components/LogOutButton.jsx";
import MyRole from "../components/FamilyManagement/MyRole.jsx";
import FamilyMemberList from "../components/FamilyManagement/FamilyMemberList.jsx";
import { getCurrentUser } from "../services/authService.js";
import {
  fetchFamily,
  fetchFamilyMembers,
} from "../services/familyService.js";

// My Family tab
export default function FamilyManagementPage() {
  //RequireLogin in App.jsx makes sure there is a user with a family here
  const { id: myId, familyId } = getCurrentUser();

  const [family, setFamily] = useState(null);
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("loading");

  //family and members are loaded at the same time
  useEffect(() => {
    Promise.all([fetchFamily(familyId), fetchFamilyMembers(familyId)])
      .then(([familyResult, membersResult]) => {
        setFamily(familyResult);
        setMembers(membersResult);
        setStatus("ready");
      })
      .catch(() => setStatus("failed"));
  }, [familyId]);

  //keeps the list on the page in sync after the user changed their own role
  function handleRoleChange(role) {
    setMembers(
      members.map((member) =>
        member.id === myId ? { ...member, role } : member,
      ),
    );
  }

  if (status === "loading") return <p>Loading family...</p>;
  if (status === "failed")
    return <p>Could not load the family. Try reloading the page.</p>;

  const me = members.find((member) => member.id === myId);
  const otherMembers = members.filter((member) => member.id !== myId);
  //happens if Back4App does not let us find users (Find must be allowed on _User for Authenticated)
  if (!me) return <p>Could not load the family members.</p>;

  return (
    <>
      <h1>{family.familyName}</h1>
      <MyRole me={me} onRoleChange={handleRoleChange} />
      <p>Invite code: {family.inviteCode}</p>
      <FamilyMemberList members={otherMembers} />
      {/* here until we have a navigation bar */}
      <LogOutButton />
    </>
  );
}
