import { Flex, Box, Text } from "rebass";
import styled from "@emotion/styled";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UserCircle } from "@styled-icons/fa-regular/UserCircle";
import { ChevronDown } from "@styled-icons/evil/ChevronDown";
import { Global } from "@emotion/react";
import cssStyle from "./style.css";

import useUser from "~/hooks/useUser";

import Impersonation from "~/containers/Impersonation";

import {
  Wrapper,
  Menu,
  MenuItem,
  Button as MenuButton,
} from "react-aria-menubutton";

import { useAuth } from "~/user/Auth";

const BlueUserCircle = styled(UserCircle)`
  color: #006be6;
`;

function LoggedMenu(props) {
  const { email } = useUser();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const { logout } = useAuth();
  function handleLogout() {
    apolloClient.clearStore();
    logout(history);
  }

  const { dropDownLinks } = props;

  function handleSelection(value) {
    if (value === "logout") {
      handleLogout();
      return;
    }
    history.push(value);
  }

  return (
    <Flex style={{ paddingTop: "55px", height: "127px" }}>
      <Global styles={cssStyle} />
      <Box height="25px">
        <Impersonation />
      </Box>

      <Box>
        <Wrapper
          tag="nav"
          className="UserMenu-AriaMenuButton"
          onSelection={handleSelection}
          style={{
            position: "relative",
            boxSizing: "border-box",
            margin: "0px",
            minWidth: "0px",
            padding: "10px",
          }}
        >
          <MenuButton
            className="UserMenu-AriaMenuButton-trigger"
            title={`${email}: Votre compte`}
            aria-label={`${email}: Votre compte`}
          >
            <Flex>
              <BlueUserCircle size={25} />
              <Box>
                <Text color="black" fontWeight="600" ml={1}>
                  {email}
                </Text>
              </Box>
              <Box height="25px">
                <ChevronDown size={25} />
              </Box>
            </Flex>
          </MenuButton>
          <Menu>
            <ul className="UserMenu-AriaMenuButton-menu">
              {dropDownLinks.map((link, i) => {
                return (
                  <li key={i}>
                    <MenuItem
                      value={link.to}
                      text={link.title}
                      className="UserMenu-AriaMenuButton-menuItem"
                    >
                      {link.title}
                    </MenuItem>
                  </li>
                );
              })}
              <li key="logout">
                <MenuItem
                  className="UserMenu-AriaMenuButton-menuItem"
                  value={`logout`}
                  text={"Se déconnecter"}
                >
                  Se déconnecter
                </MenuItem>
              </li>
            </ul>
          </Menu>
        </Wrapper>
      </Box>
    </Flex>
  );
}

export default LoggedMenu;
