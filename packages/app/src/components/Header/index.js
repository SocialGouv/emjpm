import styled from "@emotion/styled";
import { ChevronDown } from "@styled-icons/evil/ChevronDown";
import { UserCircle } from "@styled-icons/fa-regular/UserCircle";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { Logo } from "~/components";
import { useOnClickOutside } from "~/hooks";

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

  return (
    <Flex alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <Box p={1}>
        <Logo hasTitle />
      </Box>
      {!isDisconnected && (
        <Box ref={ref} p={1} sx={{ position: "relative" }}>
          <Flex onClick={toggle} sx={{ cursor: "pointer" }} alignItems="center">
            <Box height="25px">
              <BlueUserCircle size={25} />
            </Box>
            <Box>
              <Text color="black" fontWeight="600" ml={1}>
                {email}
              </Text>
            </Box>
            <Box height="25px">
              <ChevronDown size={25} />
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
