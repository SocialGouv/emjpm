import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { useAuth, impersonateLogout } from "~/user/Auth";
import ReactTooltip from "react-tooltip";

import style from "./style";
import { useEffect } from "react";

export default function Impersonation(props) {
  const { authStore } = useAuth();
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  if (!authStore.isImpersonated) return null;
  return (
    <button
      style={style}
      onClick={impersonateLogout}
      data-tip="Cliquez ici pour vous déconnecter et revenir à votre compte administrateur."
      {...props}
    >
      <UserSecret size={12} /> {`impersonation`}
    </button>
  );
}
