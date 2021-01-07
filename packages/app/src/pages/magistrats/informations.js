import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratInformations } from "~/components/MagistratInformations";
import { MagistratTribunalInformations } from "~/components/MagistratTribunalInformations";
import { BoxWrapper, Heading2 } from "~/ui";

const Informations = () => {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="0">
        <Flex
          sx={{
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320,
              p: 1,
            }}
          >
            <Heading2>Informations générales</Heading2>
            <MagistratInformations mt="3" />
          </Box>
          <Box
            sx={{
              flexBasis: 420,
              flexGrow: 1,
              p: 1,
            }}
          >
            <Heading2>Votre tribunal</Heading2>
            <MagistratTribunalInformations mt="3" />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default Informations;
