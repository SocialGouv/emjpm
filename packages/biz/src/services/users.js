function isAdmin(user) {
  return user.type === "admin";
}

function isService(user) {
  return user.type === "service";
}

function isIndividuel(user) {
  return user.type === "individuel";
}

function isPrepose(user) {
  return user.type === "prepose";
}

function isMandataire(user) {
  return isPrepose(user) || isIndividuel(user);
}

function isDirection(user) {
  return user.type === "direction";
}

function isMagistrat(user) {
  return user.type === "ti";
}

function isDirectionNationale(user) {
  return user.user_roles
    .map((ur) => ur.role.name)
    .includes("direction_nationale");
}

module.exports = {
  isAdmin,
  isDirection,
  isDirectionNationale,
  isIndividuel,
  isMagistrat,
  isMandataire,
  isPrepose,
  isService,
};
