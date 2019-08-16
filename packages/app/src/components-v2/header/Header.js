import React from "react";
import { Flex, Box, Text } from "rebass";
import { Logo } from "../commons";
import { UserCircle } from "styled-icons/fa-regular";

export const Header = () => {
  return (
    <Flex alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <Box p={1}>
        <Logo hasTitle />
      </Box>
      <Box p={1}>
        <Flex alignItems={"center"}>
          <Box height={"25px"}>
            <UserCircle size={25} />
          </Box>
          <Box>
            <Text ml={1}>Nom du user</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
