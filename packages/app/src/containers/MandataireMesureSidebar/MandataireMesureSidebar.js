import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";

import { Box, Link as StyledLink } from "rebass";

export function MandataireMesureSidebar(props) {
  return (
    <Box {...props}>
      <ArrowBack size="16" />
      <StyledLink
        as="a"
        href={props?.href || "/mandataires/mesures"}
        sx={{
          display: "inline-block",
          color: "black",
          fontSize: "1",
          my: "3",
          textDecoration: "underline",
          fontWeight: "bold",
          pl: "1",
        }}
      >
        {"Retour à la liste"}
      </StyledLink>
    </Box>
  );
}

export default MandataireMesureSidebar;
