// todo: hack: force embedding the SVG due to some webpack+next+static issues in a gh-pages env
const logo = require("!!url-loader?limit=0!../../static/images/image lebontuteur.beta.gouv.fr.png");

const Navigation = () => (
  <ul className="nav">
    <li className="navbar-brand">
      <img src={logo} style={{ width: "40%" }} alt="Accueil de LeBonTuteur.beta.gouv.fr" />
    </li>
  </ul>
);

export default Navigation;
