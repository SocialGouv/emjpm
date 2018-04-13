// todo: hack: force embedding the SVG due to some webpack+next+static issues in a gh-pages env
import Router from "next/router";

const logo = require("!!url-loader?limit=0!../../static/images/logo_emjpm.png");


const Navigation = () => (
  <ul className="nav" style={{textAlign: "center" }}>
    <li className="navbar-brand">
      <img src={logo} style={{ width: "40%" }} alt="Accueil de eMJPM.beta.gouv.fr" />
    </li>

  </ul>
);

export default Navigation;
