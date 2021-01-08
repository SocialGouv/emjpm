import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";
import { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "~/components/Commons";
import { UserContext } from "~/components/UserContext";
import { DropDownMenu, Header as HeaderComponent } from "~/ui";
import { useAuth } from "~/routes/Auth";

export const defaultLinks = [
  // { title: "Centre d'assistance", to: "https://emjpm-blog.azurewebsites.net" }
];

const Header = (props) => {
  const { username } = useContext(UserContext);
  const apolloClient = useApolloClient();
  const { dropDownLinks } = props;
  const history = useHistory();
  const { logout } = useAuth();
  const handleLogout = () => {
    apolloClient.clearStore();
    logout(history);
  };
  return (
    <Fragment>
      <HeaderComponent
        username={username}
        Link={Link}
        dropDownLinks={defaultLinks.concat(dropDownLinks)}
        disconnect={handleLogout}
        DropDownMenu={DropDownMenu}
      />
    </Fragment>
  );
};

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
