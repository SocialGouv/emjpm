import { Box, Flex } from "rebass";

import { IndicatorListTotal } from "~/components/IndicatorList";
import { IndicatorsMenu } from "~/components/IndicatorsMenu";
import { LayoutPublic } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

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
