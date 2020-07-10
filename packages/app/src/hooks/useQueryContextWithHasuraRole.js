import { useContext, useMemo } from "react";

import { UserContext } from "../components/UserContext";

function useQueryContextWithHasuraRole(rolePrefix) {
  const { user_roles: roles } = useContext(UserContext);
  const context = useMemo(() => {
    const { role } = roles.find(({ role }) => role.name.startsWith(rolePrefix));
    return role
      ? {
          headers: {
            "x-hasura-role": role.name,
          },
        }
      : {};
  }, [roles, rolePrefix]);
  return context;
}

export default useQueryContextWithHasuraRole;
