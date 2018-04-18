// todo: hack: force embedding the SVG due to some webpack+next+static issues in a gh-pages env
import Router from "next/router";

const logo = require("!!url-loader?limit=0!../../static/images/logo_emjpm.png");


const Navigation = () => (
  <div className="" style={{ marginTop: "5px", marginBottom: "5px"}}>
      <div style={{textAlign: "center" }}>
      <img src={logo} style={{ width: "30%" }} alt="Accueil de eMJPM.beta.gouv.fr" />
      </div>
  </div>
);

export default Navigation;
