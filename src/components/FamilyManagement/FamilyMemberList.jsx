//shows the other members of the family and their role (the logged in user is not in this list)
export default function FamilyMemberList({ members }) {
  if (members.length === 0) {
    return <p>No other members yet. Share the invite code to add them.</p>;
  }

  return (
    <section>
      <h2>Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.username}: {member.role}
          </li>
        ))}
      </ul>
    </section>
  );
}
