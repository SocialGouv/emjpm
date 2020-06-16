import jwtDecode from "jwt-decode";

// Hook
export const getUserFromCookie = (token) => {
  const userFromCookie = token ? jwtDecode(token) : null;
  return userFromCookie;
};
