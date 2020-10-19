import { BoxWrapper, Heading2 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceAntennes } from "../../src/components/ServiceAntennes";
import { ServiceInformations } from "../../src/components/ServiceInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={4}>
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
            <Heading2>Informations générales de votre service</Heading2>
            <ServiceInformations mt="3" />
          </Box>
        </Flex>
        <Box
          sx={{
            p: 1,
          }}
        >
          <ServiceAntennes mt="1" />
        </Box>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(Informations);
