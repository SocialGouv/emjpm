import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { Link } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { DropDownMenu, Header as HeaderComponent } from "~/components";
import { useAuth } from "~/user/Auth";

import { BoxWrapper } from "~/components/Grid";

export const defaultLinks = [
  // { title: "Centre d'assistance", to: "https://emjpm-blog.azurewebsites.net" }
];

function Header(props) {
  const { email } = useUser();
  const apolloClient = useApolloClient();
  const { dropDownLinks } = props;
  const history = useHistory();
  const { logout } = useAuth();
  function handleLogout() {
    apolloClient.clearStore();
    logout(history);
  }
  return (
    <BoxWrapper>
      <HeaderComponent
        email={email}
        Link={Link}
        dropDownLinks={defaultLinks.concat(dropDownLinks)}
        disconnect={handleLogout}
        DropDownMenu={DropDownMenu}
      />
    </BoxWrapper>
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
