import { Box, Flex } from "rebass";

import { IndicatorList } from "~/components/IndicatorList";
import { IndicatorsMenu } from "~/components/IndicatorsMenu";
import { LayoutPublic } from "~/components/Layout";
import { BoxWrapper } from "~/ui";
import { useParams } from "react-router-dom";

const DepartmentStatsPage = () => {
  const { departement_code: departementCode } = useParams();
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

export default DepartmentStatsPage;
