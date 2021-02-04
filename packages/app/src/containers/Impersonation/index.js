import { useRef, useState, useCallback, useEffect } from "react";

import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { impersonateLogout } from "~/user/Auth";

const isImpersonated = localStorage.getItem("impersonate");
export default function Impersonation({}) {
  const style = {
    position: "absolute",
    top: 10,
    left: "35%",
    padding: "1em",
    zIndex: 1050,
    backgroundColor: "white",
    borderColor: "#ff0000",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    textAlign: "center",
  };
  if (!isImpersonated) return null;
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
