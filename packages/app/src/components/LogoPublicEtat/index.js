import logo from "~public/images/MIN_Solidarite_Autonomie_Personnes_Handicapees_CMJN.jpg";

function LogoPublicEtat(props) {
  return (
    <img src={logo} alt="Ministère des Solidarités et de la Santé" {...props} />
  );
}

export default LogoPublicEtat;
