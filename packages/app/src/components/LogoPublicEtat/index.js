import logo from "~public/images/Ministere_Solidarite_Autonomie_Personnes_Handicapees.png";

function LogoPublicEtat(props) {
  return (
    <img
      src={logo}
      alt="Ministère des Solidarités, de l'Autonomie et des Personnes Handicapées"
      {...props}
    />
  );
}

export default LogoPublicEtat;
