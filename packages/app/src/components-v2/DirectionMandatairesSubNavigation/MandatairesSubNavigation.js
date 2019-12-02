import { withRouter } from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../Commons";
import { MandatairesExport } from "../DirectionMandatairesExport";
import { MandatairesSubNavigationStyle } from "./style";

const MandatairesSubNavigation = ({ router, ...props }) => {
  return (
    <Flex sx={MandatairesSubNavigationStyle} {...props}>
      <Flex>
        <LinkButton href="/direction/mandataires">Vue globale</LinkButton>
        <Box ml="1">
          <LinkButton href="/direction/mandataires/list">Vue détaillée</LinkButton>
        </Box>
      </Flex>
      {router.pathname === "/direction/mandataires/list" && <MandatairesExport />}
    </Flex>
  );
};

export default withRouter(MandatairesSubNavigation);
