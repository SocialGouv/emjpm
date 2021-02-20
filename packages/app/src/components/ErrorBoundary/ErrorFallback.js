import { Hammer2 } from "@styled-icons/icomoon/Hammer2";
import { ArrowLeft } from "@styled-icons/material/ArrowLeft";
import { PowerSettingsNew } from "@styled-icons/material/PowerSettingsNew";

import ErrorBox from "~/components/ErrorBox";
import goBackAndRefresh from "~/utils/navigation/goBackAndRefresh";

import { clearUserStorage } from "~/user/Auth";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <ErrorBox message="Une erreur s'est produite">
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>
        <Hammer2 size={12} /> Réessayer
      </button>

      <div
        style={{
          marginTop: "10px",
        }}
      >
        <button
          style={{
            fontSize: "24px",
            float: "left",
          }}
          onClick={() => {
            goBackAndRefresh();
          }}
        >
          <ArrowLeft size={40} />
          Page précédente
        </button>
        <button
          style={{
            fontSize: "24px",
            float: "right",
          }}
          onClick={() => {
            clearUserStorage();
            goBackAndRefresh();
          }}
        >
          <PowerSettingsNew size={28} />
          Se déconnecter
        </button>
      </div>

      <div>
        <a href="/">
          <img
            src="/images/error-fallback.jpg"
            style={{
              maxWidth: "calc(100wh - 40px)",
              maxHeight: "calc(100vh - 40px)",
              borderRadius: "7px",
              margin: "15px",
            }}
            alt="error"
          />
        </a>
      </div>
    </ErrorBox>
  );
}
