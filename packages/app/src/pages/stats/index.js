import { Box, Flex } from "rebass";

import { IndicatorListTotal } from "~/containers/IndicatorList";
import { IndicatorsMenu } from "~/containers/IndicatorsMenu";
import { LayoutPublic } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function StatsPage() {
  return (
    <LayoutPublic>
      <BoxWrapper>
        <Flex
          sx={{
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              flexBasis: 320,
              flexGrow: 1,
              p: 3,
            }}
          >
            <IndicatorsMenu />
          </Box>
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320,
              p: 3,
            }}
          >
            <IndicatorListTotal />
          </Box>
        </Flex>
        <Box />
      </BoxWrapper>
    </LayoutPublic>
  );
}

export default StatsPage;
