import { Flex, Box, Text } from "rebass";
import styled from "@emotion/styled";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UserCircle } from "@styled-icons/fa-regular/UserCircle";
import { ChevronDown } from "@styled-icons/evil/ChevronDown";

import useUser from "~/hooks/useUser";

import {
  Wrapper,
  Menu,
  MenuItem,
  Button as MenuButton,
} from "react-aria-menubutton";

import { useAuth } from "~/user/Auth";

import { Button } from "~/components";

const BlueUserCircle = styled(UserCircle)`
  color: #006be6;
`;

const buttonStyle = {
  "&:hover": {
    bg: "whiteGray",
  },
  background: "none",
  border: "none",
  borderRadius: 0,
  color: "black",
  display: "block",
  fontSize: 1,
  fontWeight: "body",
  outline: "none",
  p: 0,
  px: 3,
  py: 2,
  textAlign: "right",
  width: "100%",
};

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

  return (
    <Wrapper
      style={{
        position: "relative",
        boxSizing: "border-box",
        margin: "0px",
        minWidth: "0px",
        padding: "10px",
        height: "127px",
      }}
    >
      <MenuButton style={{ display: "block", marginTop: "55px" }}>
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
      <Menu
        style={{
          backgroundColor: "#F8FAFC",
          boxShadow: "rgba(33, 82, 139, 0.16) 0px 1px 1px",
          borderRadius: "5px",
          marginTop: "15px",
          overflow: "hidden",
        }}
      >
        <ul>
          {dropDownLinks.map((link, i) => {
            return (
              <li key={i}>
                <MenuItem
                  style={{
                    borderBottom: "solid 1px rgba(33, 82, 139, 0.16)",
                  }}
                >
                  <Button
                    sx={buttonStyle}
                    onClick={() => history.push(link.to)}
                  >
                    {link.title}
                  </Button>
                </MenuItem>
              </li>
            );
          })}
          <li key="logout">
            <MenuItem>
              <Button sx={buttonStyle} onClick={handleLogout}>
                Se déconnecter
              </Button>
            </MenuItem>
          </li>
        </ul>
      </Menu>
    </Wrapper>
  );
}

export default LoggedMenu;
