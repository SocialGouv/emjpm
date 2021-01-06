import React from "react";
import { Box, Flex } from "rebass";

import { DirectionInformations } from "~/components/DirectionInformations";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper, Heading2 } from "~/ui";

const Informations = () => {
  return (
    <LayoutDirection>
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
            <DirectionInformations mt="3" />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default Informations;
