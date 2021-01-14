import jwtDecode from "jwt-decode";

// Hook
export function getUserFromCookie(token) {
  const userFromCookie = token ? jwtDecode(token) : null;
  return userFromCookie;
}
