import { Helmet } from "react-helmet";
import { Box, Flex } from "rebass";

import { BoxWrapper } from "~/components/Grid";

import { FiltersContextSerializableProvider } from "~/containers/FiltersContextSerializable";
import { LayoutDirection } from "~/containers/Layout";
import { ListeBlanche } from "~/containers/ListeBlanche";
import { ListeBlancheFilter } from "~/containers/ListeBlancheFilter";
import { ListeBlancheSummary } from "~/containers/ListeBlancheSummary";
import useUser from "~/hooks/useUser";
import { SkipToContent } from "~/components";

function ListBlanchePage() {
  const user = useUser();
  const [direction] = user.directions;
  const initialFilters = {};

  if (direction?.type === "departemental") {
    initialFilters.departement = direction.departement.id;
  } else if (direction?.type === "regional") {
    initialFilters.region = direction.region.id;
  }

  return (
    <>
      <Helmet>
        <title>Liste blanche | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="direction_filter" />
      <LayoutDirection>
        <FiltersContextSerializableProvider
          useLocalStorage={true}
          initialFilters={initialFilters}
        >
          <BoxWrapper mt={3} px={1}>
            <Flex flexDirection="column">
              <Box mb="2">
                <ListeBlancheFilter />
              </Box>
              <Box mb="2">
                <ListeBlancheSummary />
              </Box>
              <Box mb="2">
                <ListeBlanche origin="direction" />
              </Box>
            </Flex>
          </BoxWrapper>
        </FiltersContextSerializableProvider>
      </LayoutDirection>
    </>
  );
}

export default ListBlanchePage;
