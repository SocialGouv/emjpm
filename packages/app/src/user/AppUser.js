import { useMemo, useEffect } from "react";
import jwtDecode from "jwt-decode";

import { UserProvider } from "~/containers/UserContext/index";

import { useAuth } from "~/user/Auth";
import { formatUserFromToken } from "~/user/formatUserFromToken";

import { setUser } from "~/user/sentry";
import creds from "~/user/creds";

export default function AppUser({ children }) {
  const { authStore } = useAuth();

  const user = useMemo(() => {
    const currentUser = authStore.id ? jwtDecode(creds.token) : null;
    return formatUserFromToken(currentUser);
  }, [authStore.id]);

  useEffect(() => {
    if (authStore.id) {
      const { id, role } = jwtDecode(creds.token);
      setUser(id, role);
    }
  }, [authStore.id]);

  return <UserProvider user={user}>{children}</UserProvider>;
}
