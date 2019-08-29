import React from "react";

import { Box, Flex } from "rebass";

import { BoxWrapper } from "../../src/components-v2/commons";
import { Heading2 } from "@socialgouv/emjpm-ui-core";
import { LayoutServices } from "../../src/components-v2/layout";
import { ServicesInformations } from "../../src/components-v2/servicesInformations";

const Informations = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320
            }}
          >
            <Heading2>Vos informations</Heading2>
            <ServicesInformations />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              flexBasis: 256
            }}
          >
            <Heading2>Mesures souhaitées</Heading2>
            map and other stuff
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default Informations;
