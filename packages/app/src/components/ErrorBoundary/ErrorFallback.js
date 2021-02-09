import { Hammer2 } from "@styled-icons/icomoon/Hammer2";
import { ArrowLeft } from "@styled-icons/material/ArrowLeft";

import ErrorBox from "~/components/ErrorBox";
import history from "~/routes/history.js";

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
          onClick={() => history.goBack()}
        >
          <ArrowLeft size={40} />
          Retour à la page précédente
        </button>
      </div>
    </ErrorBox>
  );
}
