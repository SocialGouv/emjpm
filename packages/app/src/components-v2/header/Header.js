import React from "react";
import { Flex, Box } from "rebass";
import { Logo } from "../commons";

export const Header = () => {
  return (
    <Flex>
      <Box p={1}>
        <Logo />
      </Box>
      <Box p={1}>Nom du user</Box>
    </Flex>
  );
};
