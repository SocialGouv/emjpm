import logo from "~public/images/Ministere_des_Solidarites_et_de_la_Sante.png";
import publicLogo from "~public/images/MIN_Solidarité_Autonomie_Personnes_Handicapées_CMJN.jpg"

function LogoEtat(props) {
  return (
    <img src={logo} alt="Ministère des Solidarités et de la Santé" {...props} />
  );
}

function LogoPublicEtat(props) {
  return (
    <img src={publicLogo} alt="Ministère des Solidarités et de la Santé" {...props} />
  );
}

export {LogoEtat, LogoPublicEtat};
