import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { IndicatorList } from "~/containers/IndicatorList";
import { IndicatorsMenu } from "~/containers/IndicatorsMenu";
import { LayoutPublic } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";
import { useParams } from "react-router-dom";
import { SkipToContent } from "~/components";

function DepartmentStatsPage() {
  const { departement_code: departementCode } = useParams();
  return (
    <>
      <Helmet>
        <title>Statistiques du département {departementCode} | e-MJPM </title>
      </Helmet>
      <SkipToContent skipTo="indicators_menu" />
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
              id="indicators_menu"
              tabIndex="0"
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
    </>
  );
}

export default DepartmentStatsPage;
