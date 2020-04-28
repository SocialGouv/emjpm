import { DropDownMenu, Header as HeaderComponent } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";

import { logout } from "../../util/auth";
import { Link } from "../Commons";
import { UserContext } from "../UserContext";

export const defaultLinks = [
  // { title: "Centre d'assistance", url: "https://emjpm-blog.azurewebsites.net" }
];

const Header = props => {
  const { username } = useContext(UserContext);
  const { dropDownLinks } = props;
  return (
    <Fragment>
      <HeaderComponent
        username={username}
        Link={Link}
        dropDownLinks={defaultLinks.concat(dropDownLinks)}
        disconnect={logout}
        DropDownMenu={DropDownMenu}
      />
    </Fragment>
  );
};

Header.defaultProps = {
  isDisconnected: false,
  dropDownLinks: []
};

Header.propTypes = {
  dropDownLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  isDisconnected: PropTypes.bool
};

export { Header };
