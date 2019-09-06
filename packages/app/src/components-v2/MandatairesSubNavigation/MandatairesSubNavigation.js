import React from "react";
import { Flex } from "rebass";

import { MandatairesSubNavigationStyle } from "./style";
import { LinkButton } from "../Commons";

const MandatairesSubNavigation = props => {
  return (
    <Flex sx={MandatairesSubNavigationStyle} {...props}>
      <Flex>
        <LinkButton href="/direction/mandataires" mr="1">
          Vue globale
        </LinkButton>
        <LinkButton href="/direction/mandataires/list">Vue détaillée</LinkButton>
      </Flex>
      <LinkButton href="/direction">Exporter toutes les données</LinkButton>
    </Flex>
  );
};

export { MandatairesSubNavigation };
