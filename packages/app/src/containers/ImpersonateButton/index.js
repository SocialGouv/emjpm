import { Button } from "~/components";

import { UserSecret } from "@styled-icons/fa-solid/UserSecret";
import { impersonateLogin, useAuth } from "~/user/Auth";
import { useCallback } from "react";

export default function ImpersonateButton({ userId: id }) {
  const { authStore } = useAuth();
  const { token } = authStore;
  const onClickImpersonate = useCallback(() => {
    impersonateLogin({ id, token });
  }, [id, token]);

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
