import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

import { Box, Flex, Link as StyledLink, Text } from "rebass";

import { Link } from "~/containers/Link";

const linkStyle = { color: "black", fontSize: "1", my: "3" };

export function MandataireMesureSidebar(props) {
  return (
    <Box {...props}>
      <Link
        to="/mandataires/mesures"
        component={(props) => (
          <StyledLink
            onClick={() => props.navigate(props.href)}
            sx={linkStyle}
            display="block"
          >
            <Flex>
              <ArrowBack size="16" />
              <Text
                sx={{ textDecoration: "underline" }}
                fontWeight="bold"
                pl="1"
              >
                {"Retour à la liste"}
              </Text>
            </Flex>
          </StyledLink>
        )}
      />
    </Box>
  );
}

export default MandataireMesureSidebar;
