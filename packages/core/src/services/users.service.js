export function isAdmin(user) {
  return user.type === 'admin';
}

export function isDirectionNationale(user) {
  return user.user_roles.map((ur) => ur.role.name).includes('direction_nationale');
}
