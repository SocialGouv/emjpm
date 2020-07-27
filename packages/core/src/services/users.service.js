export function isAdmin(user) {
  return user.type === 'admin';
}

export function isIndividuel(user) {
  return user.type === 'individuel';
}

export function isPrepose(user) {
  return user.type === 'prepose';
}

export function isDirection(user) {
  return user.type === 'direction';
}

export function isDirectionNationale(user) {
  return user.user_roles.map((ur) => ur.role.name).includes('direction_nationale');
}
