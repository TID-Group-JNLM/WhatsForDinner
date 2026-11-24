//Cloud Code runs on the Back4App server. Deploy it with "b4a deploy" from the back4app folder (see README)
//useMasterKey lets the server skip the ACLs. The master key itself is only on the server, never in this repo

//returns the members of the logged in user's own family with their role
//_User rows are private (only the owner can read them), so the browser cannot find the other members itself
Parse.Cloud.define(
  "getFamilyMembers",
  async (request) => {
    //the family is read on the server, so a user cannot ask for another family's members
    const family = request.user.get("family");
    if (!family) {
      throw new Parse.Error(
        Parse.Error.OBJECT_NOT_FOUND,
        "You are not in a family",
      );
    }

    const query = new Parse.Query(Parse.User);
    query.equalTo("family", family);
    query.ascending("name");
    const members = await query.find({ useMasterKey: true });

    //only send what the page needs. Not the username, because it is the email
    return members.map((member) => ({
      id: member.id,
      name: member.get("name"),
      role: member.get("role"),
    }));
  },
  { requireUser: true },
);
