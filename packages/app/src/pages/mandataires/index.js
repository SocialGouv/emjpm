import { Box, Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireBoard } from "~/components/MandataireBoard";
import { StatisticMesureNature } from "~/components/StatisticMesureNature";
import { BoxWrapper } from "~/ui";

function MandataireBoardView() {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <Flex>
          <Box width={1 / 3}>
            <MandataireBoard />
          </Box>
          <Box width={2 / 3}>
            <StatisticMesureNature />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutMandataire>
  );
}

function Mandataires() {
  return <MandataireBoardView />;
}

export default Mandataires;
