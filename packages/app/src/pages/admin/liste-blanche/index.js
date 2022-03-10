import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { FiltersContextSerializableProvider } from "~/containers/FiltersContextSerializable";
import { LayoutAdmin } from "~/containers/Layout";
import { ListeBlanche } from "~/containers/ListeBlanche";
import { ListeBlancheFilter } from "~/containers/ListeBlancheFilter";
import { ListeBlancheSummary } from "~/containers/ListeBlancheSummary";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function ListBlanchePage() {
  return (
    <>
      <Helmet>
        <title>Liste blanche | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="direction_filter" />
      <LayoutAdmin>
        <FiltersContextSerializableProvider useLocalStorage={true}>
          <BoxWrapper mt={3} px={1}>
            <Flex flexDirection="column">
              <Box mb="2">
                <ListeBlancheFilter />
              </Box>
              <Box mb="2">
                <ListeBlancheSummary />
              </Box>
              <Box mb="2">
                <ListeBlanche origin="admin" />
              </Box>
            </Flex>
          </BoxWrapper>
        </FiltersContextSerializableProvider>
      </LayoutAdmin>
    </>
  );
}

export default ListBlanchePage;
