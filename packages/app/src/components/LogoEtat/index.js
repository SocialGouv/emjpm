import logo from "~public/images/Ministere_des_Solidarites_et_de_la_Sante.png";

function LogoEtat(props) {
  return (
    <img src={logo} alt="Ministère des Solidarités et de la Santé" {...props} />
  );
}

export default LogoEtat;
