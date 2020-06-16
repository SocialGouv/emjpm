import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { IndicatorList } from "../../src/components/IndicatorList";
import { IndicatorsMenu } from "../../src/components/IndicatorsMenu";
import { LayoutPublic } from "../../src/components/Layout";

const DepartmentStatsPage = (props) => {
  const { departementCode } = props;
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
            <IndicatorList departementCode={departementCode} />
          </Box>
        </Flex>
        <Box />
      </BoxWrapper>
    </LayoutPublic>
  );
};

DepartmentStatsPage.getInitialProps = async ({ query }) => {
  return { departementCode: query.departement_code };
};

export default DepartmentStatsPage;
