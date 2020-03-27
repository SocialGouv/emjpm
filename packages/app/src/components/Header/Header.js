import { DropDownMenu, Header as HeaderComponent } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";

import { logout } from "../../util/auth";
import { Link } from "../Commons";
import { UserContext } from "../UserContext";
import { dropDownLinks } from "./dropDownLink";

const Header = () => {
  const { username } = useContext(UserContext);
  return (
    <Fragment>
      <HeaderComponent
        username={username}
        Link={Link}
        dropDownLinks={dropDownLinks}
        disconnect={logout}
        DropDownMenu={DropDownMenu}
      />
    </Fragment>
  );
};

Header.defaultProps = {
  isDisconnected: false
};

Header.propTypes = {
  isDisconnected: PropTypes.bool
};

export { Header };
