export function normalizeFirstName(value) {
  if (!value) {
    value = "";
  }
  return value
    .toLocaleLowerCase()
    .replace(/\b[a-z]/g, (match) => match.toUpperCase());
}

export function normalizeLastName(value) {
  if (!value) {
    value = "";
  }
  return value.toUpperCase();
}
