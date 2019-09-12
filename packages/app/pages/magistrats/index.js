import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MandatairesList } from "../../src/components-v2/MandatairesList";

const Mandataires = () => {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Heading1>Tous les mandataires</Heading1>
        <MandatairesList />
        {/* <Flex
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
        </Flex> */}
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default Mandataires;
