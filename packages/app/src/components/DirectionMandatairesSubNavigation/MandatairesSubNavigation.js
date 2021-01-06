import { withRouter } from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "~/components/Commons";

import { MandatairesSubNavigationStyle } from "./style";

const MandatairesSubNavigation = (props) => {
  return (
    <Flex sx={MandatairesSubNavigationStyle} {...props}>
      <Flex>
        <LinkButton href="/direction">Vue globale</LinkButton>
        <Box ml="1">
          <LinkButton href="/direction/mandataires/list">
            Vue détaillée
          </LinkButton>
        </Box>
      </Flex>
    </Flex>
  );
};

export default withRouter(MandatairesSubNavigation);
