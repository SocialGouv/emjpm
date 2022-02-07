import { Box, Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { ServiceBoard } from "~/containers/ServiceBoard";
import { StatisticMesureNature } from "~/containers/StatisticMesureNature";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function ServiceBoardView() {
  return (
    <>
      <SkipToContent skipTo="vos_indicateurs" />
      <LayoutServices>
        <BoxWrapper mt={3} px="1">
          <Flex>
            <Box width={1 / 3}>
              <ServiceBoard />
            </Box>
            <Box width={2 / 3}>
              <StatisticMesureNature />
            </Box>
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default ServiceBoardView;
