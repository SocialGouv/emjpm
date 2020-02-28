import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { IndicatorListTotal } from "../../src/components/IndicatorList";
import { IndicatorsMenu } from "../../src/components/IndicatorsMenu";
import { LayoutPublic } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const IndicatorPage = () => {
  return (
    <LayoutPublic>
      <BoxWrapper>
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexBasis: 320,
              flexGrow: 1,
              p: 3
            }}
          >
            <IndicatorsMenu />
          </Box>
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320,
              p: 3
            }}
          >
            <IndicatorListTotal />
          </Box>
        </Flex>
        <Box />
      </BoxWrapper>
    </LayoutPublic>
  );
};

export default withAuthSync(IndicatorPage);
