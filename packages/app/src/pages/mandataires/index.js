import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireBoard } from "~/containers/MandataireBoard";
import { StatisticMesureNature } from "~/containers/StatisticMesureNature";
import { BoxWrapper } from "~/components/Grid";

function MandataireBoardView() {
  return (
    <>
      <Helmet>
        <title>Tableau de bard | e-MJPM </title>
      </Helmet>
      <LayoutMandataire>
        <BoxWrapper mt={3} px="1">
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
    </>
  );
}

function Mandataires() {
  return <MandataireBoardView />;
}

export default Mandataires;
