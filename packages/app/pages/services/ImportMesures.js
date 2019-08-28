import React from "react";

import { Box, Flex } from "rebass";

import { BoxWrapper } from "../../src/components-v2/commons";
import { Heading1 } from "@socialgouv/emjpm-ui-core";
import { ServicesFilters } from "../../src/components-v2/servicesFilters";
import { LayoutServices } from "../../src/components-v2/layout";

const ImportMesures = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <Heading1>Toutes vos mesures</Heading1>
        <ServicesFilters />
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              p: 3,
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320
            }}
          >
            Mesures list
          </Box>
          <Box
            sx={{
              p: 3,
              flexGrow: 1,
              flexBasis: 256
            }}
          >
            map and other stuff
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default ImportMesures;
