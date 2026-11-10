import Parse from "./parse.js";

const Family = Parse.Object.extend("Family");

function toFamily(family) {
  return {
    id: family.id,
    familyName: family.get("familyName"),
    inviteCode: family.get("inviteCode"),
  };
}

// O, 0, I and 1 are left out because they are easy to mix up when typing the code
function createInviteCode() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

function findFamilyByInviteCode(inviteCode) {
  return new Parse.Query(Family).equalTo("inviteCode", inviteCode).first();
}

//Parse cannot make a field unique, so we check it ourselves
async function createUniqueInviteCode() {
  let code = createInviteCode();
  while (await findFamilyByInviteCode(code)) {
    code = createInviteCode();
  }
  return code;
}

export async function createFamily(familyName) {
  const family = new Family();
  family.set("familyName", familyName);
  family.set("inviteCode", await createUniqueInviteCode());
  await family.save();

  const user = Parse.User.current();
  user.set("family", family);
  user.set("role", "parent");
  await user.save();

  return toFamily(family);
}

export async function joinFamily(inviteCode) {
  const family = await findFamilyByInviteCode(inviteCode);
  if (!family) {
    throw new Error("No family with that invite code");
  }

  const user = Parse.User.current();
  user.set("family", family);
  user.set("role", "child");
  await user.save();

  return toFamily(family);
}
