import Router from "next/router";

// todo: hack: force embedding the SVG due to some webpack+next+static issues in a gh-pages env
const logo = require("!!url-loader?limit=0!../../../static/images/logo_emjpm.png");

const doLogout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("id_token");
  Router.push("/login");
};

const doInscription = () => {
  // Clear user token and profile data from localStorage
  Router.push("/inscription");
};

const Navigation = ({ logout, inscription }) => (
  <div
    style={{
      background: "white",
      padding: "15px 0",
      textAlign: "center",
      display: "flex",
      flexDirection: "row"
    }}
  >
    <div style={{ flex: "0 0 300px" }} />
    <div style={{ flex: "1 0 auto" }}>
      <a href="https://emjpm.beta.gouv.fr/">
        <img
          src={logo}
          style={{ width: "60%", maxWidth: 400 }}
          alt="Accueil de eMJPM.beta.gouv.fr"
        />
      </a>
    </div>
    <div style={{ flex: "0 0 300px", textAlign: "right", paddingRight: 10 }}>
      <a
        href="https://emjpm-doc.num.social.gouv.Fr"
        style={{ cursor: "pointer", marginTop: 10, marginRight: 10 }}
      >
        Guide d'utilisation
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
          onClick={doLogout}
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
);

export default Navigation;
