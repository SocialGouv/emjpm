import Router from "next/router";

// todo: hack: force embedding the SVG due to some webpack+next+static issues in a gh-pages env
const logo = require("!!url-loader?limit=0!../../static/images/logo_emjpm.png");

const API_URL = process.env.API_URL;

const doLogout = () =>
  fetch(`${API_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      Router.push("/login");
      return json;
    });

const Navigation = ({ logout }) => (
  <div style={{ background: "white", padding: "15px 0", textAlign: "center" }}>
    <img src={logo} style={{ width: "60%", maxWidth: 400 }} alt="Accueil de eMJPM.beta.gouv.fr" />
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
