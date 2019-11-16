import React from "react";

const LoadingMessage = () => (
  <div style={{ alignItems: "center", display: "flex" }}>
    <div
      style={{
        flex: "1 0 auto",
        margin: "25px 0",
        textAlign: "center"
      }}
    >
      Chargement en cours...
    </div>
  </div>
);

export default LoadingMessage;
