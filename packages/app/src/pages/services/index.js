import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { ServiceBoard } from "~/components/ServiceBoard";
import { StatisticMesureNature } from "~/components/StatisticMesureNature";
import { withAuthSync } from "~/util/auth";

const ServiceBoardView = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
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
  );
};

export default withAuthSync(ServiceBoardView);
