import { useMemo } from "react";
import jwtDecode from "jwt-decode";

import { UserProvider } from "~/containers/UserContext/index";

import { useAuth } from "~/user/Auth";
import { formatUserFromToken } from "~/user/formatUserFromToken";

export default function AppUser({ children }) {
  const { authStore } = useAuth();
  const { token } = authStore;

  const user = useMemo(() => {
    const currentUser = token ? jwtDecode(token) : null;
    return formatUserFromToken(currentUser);
  }, [token]);

  return <UserProvider user={user}>{children}</UserProvider>;
}
