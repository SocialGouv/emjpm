import { withRouter } from "next/router";
import React from "react";
import { Flex } from "rebass";
import { LinkButton } from "../Commons";
import { MandatairesExport } from "../MandatairesExport";
import { MandatairesSubNavigationStyle } from "./style";

const MandatairesSubNavigation = ({ router, ...props }) => {
  return (
    <Flex sx={MandatairesSubNavigationStyle} {...props}>
      <Flex>
        <LinkButton href="/direction/mandataires" mr="1">
          Vue globale
        </LinkButton>
        <LinkButton href="/direction/mandataires/list">Vue détaillée</LinkButton>
      </Flex>
      {router.pathname === "/direction/mandataires/list" && <MandatairesExport />}
    </Flex>
  );
};

export default withRouter(MandatairesSubNavigation);
