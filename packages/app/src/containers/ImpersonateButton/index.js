import { Button } from "~/components";

import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { impersonateLogin } from "~/user/Auth";
import { useCallback } from "react";

import creds from "~/user/creds";

export default function ImpersonateButton({ userId: id }) {
  const onClickImpersonate = useCallback(() => {
    impersonateLogin({ id, token: creds.token });
  }, [id]);

  return (
    <Button
      style={{
        backgroundColor: "white",
        borderColor: "#007AD9",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        padding: "12px",
      }}
      onClick={onClickImpersonate}
    >
      <UserSecret
        size={18}
        style={{ color: "#333", height: "100%" }}
        role="img"
        aria-hidden="false"
        aria-label="Impersonnate"
      />
    </Button>
  );
}
