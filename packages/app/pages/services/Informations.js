import React from "react";

import { Box, Flex } from "rebass";

import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";

import { LayoutServices } from "../../src/presentationalComponents/layout";

import { ServicesInformations } from "../../src/components-v2/servicesInformations";

import { PreferencesPanel } from "../../src/presentationalComponents/PreferencesPanel";
import { Antennes } from "../../src/presentationalComponents/Antennes";

const Informations = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="0">
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              p: 1,
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320
            }}
          >
            <Heading2>Informations générales</Heading2>
            <ServicesInformations mt="3" />
          </Box>
          <Box
            sx={{
              p: 1,
              flexGrow: 1,
              flexBasis: 320
            }}
          >
            <Heading2>Mesures souhaitées</Heading2>
            <PreferencesPanel />
          </Box>
        </Flex>
        <Box
          sx={{
            p: 1
          }}
        >
          <Heading2 mt="1">Antennes</Heading2>
          <Antennes mt="1" />
        </Box>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default Informations;
