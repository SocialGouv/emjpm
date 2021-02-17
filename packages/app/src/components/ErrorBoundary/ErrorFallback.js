import { Hammer2 } from "@styled-icons/icomoon/Hammer2";
import { ArrowLeft } from "@styled-icons/material/ArrowLeft";

import ErrorBox from "~/components/ErrorBox";
// import history from "~/routes/history.js";

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
          }}
          onClick={() => {
            // history.goBack();
            window.history.go(-1);
          }}
        >
          <ArrowLeft size={40} />
          Page précédente
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
