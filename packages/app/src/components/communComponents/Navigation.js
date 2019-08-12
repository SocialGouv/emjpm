import Router from "next/router";
import React from "react";
import { ApolloConsumer } from "react-apollo";
import redirect from "../../lib/redirect";
import { untrackUser } from "../../piwik";
import { authService } from "../../services";

const doLogout = apolloClient => {
  authService.logout();
  // Force a reload of all the current queries now that the user is
  // logged in, so we don't accidentally leave any state around.
  apolloClient.cache.reset().then(() => {
    untrackUser();
    redirect({}, "/login");
  });
};

const doInscription = () => {
  // Clear user token and profile data from localStorage
  Router.push("/inscription");
};

const Navigation = ({ logout, inscription }) => (
  <ApolloConsumer>
    {client => (
      <div
        style={{
          background: "white",
          padding: "7px 0",
          textAlign: "left",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <div style={{ flex: "0 0 50px" }} />
        <div style={{ flex: "1 0 auto" }}>
          <a href="https://emjpm.beta.gouv.fr/">
            <img
              src={"/static/images/logo_emjpm_num.png"}
              style={{ width: "60%", maxWidth: 350 }}
              alt="Accueil de eMJPM.beta.gouv.fr"
            />
          </a>
        </div>
        <div style={{ flex: "0 0 300px", textAlign: "right", paddingRight: 10 }}>
          <a
            href="https://emjpm-doc.num.social.gouv.Fr"
            style={{ cursor: "pointer", marginTop: 10, marginRight: 10 }}
          >
            Guide d&apos;utilisation
          </a>
          {inscription && (
            <a
              href="#"
              onClick={doInscription}
              style={{
                color: "#007bff",
                cursor: "pointer",
                marginTop: 10,
                display: "inline-block"
              }}
            >
              Inscription
            </a>
          )}
          {logout && (
            <a
              href="#"
              onClick={() => doLogout(client)}
              style={{
                color: "#007bff",
                cursor: "pointer",
                marginTop: 10,
                display: "inline-block"
              }}
            >
              Se déconnecter
            </a>
          )}
        </div>
      </div>
    )}
  </ApolloConsumer>
);

export default Navigation;
