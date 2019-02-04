import Router from "next/router";
import piwik from "react-piwik";
import styled from "styled-components";

// todo: hack: force embedding the SVG due to some webpack+next+static issues in a gh-pages env
const logo = require("!!url-loader?limit=0!../../../static/images/logo_emjpm_num.png");

const doLogout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("id_token");
  piwik.push(["resetUserId"]);
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
          src={logo}
          style={{ width: "60%", maxWidth: 350 }}
          alt="Accueil de eMJPM.beta.gouv.fr"
        />
      </a>
    </div>
    <NavLinks>
      <NavLink href="https://emjpm-doc.num.social.gouv.fr">Guide d&apos;utilisation</NavLink>
      {inscription && <NavButton onClick={doInscription}>Inscription</NavButton>}
      {logout && <NavButton onClick={doLogout}>Se déconnecter</NavButton>}
    </NavLinks>
  </div>
);

export default Navigation;

//

const NavButton = styled.button.attrs({
  className: "btn btn-link"
})``;

const NavLink = styled.a.attrs({
  className: "btn btn-link"
})``;

const NavLinks = styled.div.attrs({
  className: "align-items-center d-flex"
})`flex: 0 0 300px;`;
