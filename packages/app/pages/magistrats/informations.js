import React from "react";

import { Box, Flex } from "rebass";
import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";

import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MagistratInformations } from "../../src/components-v2/MagistratInformations";

const Informations = () => {
  return (
    <LayoutMagistrat>
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
            <MagistratInformations mt="3" />
          </Box>
          <Box
            sx={{
              p: 1,
              flexGrow: 1,
              flexBasis: 320
            }}
          />
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default Informations;
