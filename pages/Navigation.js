import { render } from "react-dom";

class Navigation extends React.Component {
  render() {
    return (
      <ul className="nav">
        <li className="navbar-brand">
          <img
            src="/static/images/gouv.svg"
            style={{ width: "40%" }}
            alt="Accueil de LeBonTuteur.beta.gouv.fr"
          />
        </li>
      </ul>
    );
  }
}

export default Navigation;
