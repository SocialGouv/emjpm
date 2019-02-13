import Router from "next/router";

import apiCall from "./Api";

// todo: hack: force embedding the SVG due to some webpack+next+static issues in a gh-pages env
const logo = require("!!url-loader?limit=0!../../../static/images/logo_emjpm.png");

const doLogout = () =>
  apiCall("/auth/logout")
    .then(json => {
      Router.push("/login");
      return json;
    })
    .catch(e => {
      Router.push("/login");
      console.log(e);
      throw e;
    });

const Navigation = ({ logout }) => (
  <div style={{ background: "white", padding: "15px 0", textAlign: "center" }}>
    <a href="https://emjpm.beta.gouv.fr/">
      <img src={logo} style={{ width: "60%", maxWidth: 400 }} alt="Accueil de eMJPM.beta.gouv.fr" />
    </a>
    {logout && (
      <div
        onClick={doLogout}
        style={{ cursor: "pointer", float: "right", marginTop: 10, marginRight: 10 }}
      >
        Se déconnecter
      </div>
    )}
  </div>
);

export default Navigation;
