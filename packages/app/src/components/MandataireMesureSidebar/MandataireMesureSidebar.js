import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

import { Box, Flex, Link as StyledLink, Text } from "rebass";

import { Link } from "~/components/Link";

const linkStyle = { color: "black", fontSize: "1", my: "3" };

export const MandataireMesureSidebar = (props) => {
  return (
    <Box {...props}>
      <Link to="/mandataires/mesures">
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
