import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import Link from "next/link";
import React from "react";
import { Box, Flex, Link as StyledLink, Text } from "rebass";

const linkStyle = { color: "black", fontSize: "1", my: "3" };

export const MandataireMesureSidebar = props => {
  return (
    <Box {...props}>
      <Link href="/mandataires">
        <StyledLink sx={linkStyle} display="block">
          <Flex>
            <ArrowBack size="16" />
            <Text sx={{ textDecoration: "underline" }} fontWeight="bold" pl="1">
              {"Retour à la liste"}
            </Text>
          </Flex>
        </StyledLink>
      </Link>
    </Box>
  );
};

export default MandataireMesureSidebar;
