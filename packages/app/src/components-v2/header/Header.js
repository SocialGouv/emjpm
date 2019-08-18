import React, { useState, useRef } from "react";
import { Flex, Box, Text } from "rebass";
import styled from "@emotion/styled";

import { UserCircle } from "styled-icons/fa-regular";
import { ChevronDown } from "styled-icons/evil";

import { Logo } from "../commons";
import { useOnClickOutside } from "../../lib/hooks";

const BlueUserCircle = styled(UserCircle)`
  color: #006be6;
`;

export const Header = props => {
  const { DropDownMenu, username } = props;
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
      <Box ref={ref} p={1} sx={{ position: "relative" }}>
        <Flex onClick={toggle} sx={{ cursor: "pointer" }} alignItems={"center"}>
          <Box height={"25px"}>
            <BlueUserCircle size={25} />
          </Box>
          <Box>
            <Text color="black" fontWeight="600" ml={1}>
              {username}
            </Text>
          </Box>
          <Box height={"25px"}>
            <ChevronDown size={25} />
          </Box>
        </Flex>
        {state && <DropDownMenu />}
      </Box>
    </Flex>
  );
};
