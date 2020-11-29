import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireBoard } from "../../src/components/MandataireBoard";
import { MandataireStatisticMesureNature } from "../../src/components/MandataireBoardStat/MandataireStatisticMesureNature";
import { withAuthSync } from "../../src/util/auth";

const MandataireBoardView = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <Flex>
          <Box width={1 / 3}>
            <MandataireBoard />
          </Box>
          <Box width={2 / 3}>
            <MandataireStatisticMesureNature />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutMandataire>
  );
};

const Mandataires = () => {
  return <MandataireBoardView />;
};

export default withAuthSync(Mandataires);
