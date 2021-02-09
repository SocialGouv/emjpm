import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

import { Box, Flex, Link as StyledLink, Text } from "rebass";

import { Link } from "~/components/Link";

const linkStyle = { color: "black", fontSize: "1", my: "3" };

function ServiceMesureSidebar(props) {
  return (
    <Box {...props}>
      <Link
        to="/services/mesures"
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

export { ServiceMesureSidebar };
