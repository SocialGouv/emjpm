import styled from "@emotion/styled";
import { ChevronDown } from "@styled-icons/evil/ChevronDown";
import { UserCircle } from "@styled-icons/fa-regular/UserCircle";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useRef, useState, useCallback } from "react";
import { Box, Flex, Text } from "rebass";
import { LogoEtat } from "~/components";
import { useOnClickOutside } from "~/hooks";

import Impersonation from "~/containers/Impersonation";

const BlueUserCircle = styled(UserCircle)`
  color: #006be6;
`;

function Header(props) {
  const {
    DropDownMenu,
    email,
    dropDownLinks,
    Link,
    disconnect,
    isDisconnected,
  } = props;
  const ref = useRef();
  const [state, setState] = useState(false);
  useOnClickOutside(ref, () => setState(false));

  function toggle(event) {
    event.stopPropagation();
    setState(!state);
  }

  const history = useHistory();

  const goToHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Flex
      alignItems="center"
      flexWrap="wrap"
      justifyContent="space-between"
      height="115px"
    >
      <Box p={1}>
        <Flex flexWrap="wrap" justifyContent="left">
          <Box>
            <LogoEtat />
          </Box>
          <Box ml={2}>
            <button onClick={goToHome} style={{ paddingTop: "24px" }}>
              <Text
                color="#007AD9"
                fontWeight="100"
                fontSize="5"
                style={{ display: "inline" }}
              >
                e
              </Text>
              <Text
                color="#404040"
                fontWeight="100"
                fontSize="5"
                style={{ display: "inline" }}
              >
                MJPM
              </Text>
            </button>
          </Box>
        </Flex>
      </Box>
      {!isDisconnected && (
        <Box ref={ref} p={1} sx={{ position: "relative" }}>
          <Flex alignItems="center">
            <Box height="25px">
              <Impersonation />
            </Box>
            <Box height="25px">
              <Flex onClick={toggle} sx={{ cursor: "pointer" }}>
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
            </Box>
          </Flex>
          {state && (
            <DropDownMenu
              disconnect={disconnect}
              Link={Link}
              dropDownLinks={dropDownLinks}
            />
          )}
        </Box>
      )}
    </Flex>
  );
}

Header.defaultProps = {
  DropDownMenu: null,
  Link: null,
  disconnect: null,
  dropDownLinks: [],
  isDisconnected: false,
  email: null,
};

Header.propTypes = {
  DropDownMenu: PropTypes.elementType,
  Link: PropTypes.elementType,
  disconnect: PropTypes.func,
  dropDownLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      to: PropTypes.string,
    })
  ),
  isDisconnected: PropTypes.bool,
  email: PropTypes.string,
};

export default Header;
