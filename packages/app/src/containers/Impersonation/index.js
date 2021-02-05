import { useRef, useState, useCallback, useEffect } from "react";

import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { useAuth, impersonateLogout } from "~/user/Auth";

import style from "./style";

export default function Impersonation({}) {
  const { authStore } = useAuth();
  if (!authStore.isImpersonated) return null;
  return (
    <div style={style}>
      <button onClick={impersonateLogout}>
        <UserSecret size={12} />{" "}
        {`Vous êtes actuellement connecté en mode impersonate depuis un compte administrateur.`}
        <br />
        {`Cliquez ici pour vous déconnecter et revenir à votre compte administrateur.`}
      </button>
    </div>
  );
}
