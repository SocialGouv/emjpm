import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";
import { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "~/containers/Commons";
import { UserContext } from "~/containers/UserContext";
import { DropDownMenu, Header as HeaderComponent } from "~/components";
import { useAuth } from "~/user/Auth";

export const defaultLinks = [
  // { title: "Centre d'assistance", to: "https://emjpm-blog.azurewebsites.net" }
];

function Header(props) {
  const { email } = useContext(UserContext);
  const apolloClient = useApolloClient();
  const { dropDownLinks } = props;
  const history = useHistory();
  const { logout } = useAuth();
  function handleLogout() {
    apolloClient.clearStore();
    logout(history);
  }
  return (
    <Fragment>
      <HeaderComponent
        email={email}
        Link={Link}
        dropDownLinks={defaultLinks.concat(dropDownLinks)}
        disconnect={handleLogout}
        DropDownMenu={DropDownMenu}
      />
    </Fragment>
  );
}

Header.defaultProps = {
  dropDownLinks: [],
  isDisconnected: false,
};

Header.propTypes = {
  dropDownLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ),
  isDisconnected: PropTypes.bool,
};

export { Header };
