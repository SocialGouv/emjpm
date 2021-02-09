import { useContext } from "react";
import { Box, Flex } from "rebass";

import { BoxWrapper } from "~/components/Grid";

import { FiltersContextSerializableProvider } from "~/containers/FiltersContextSerializable";
import { LayoutDirection } from "~/containers/Layout";
import { ListeBlanche } from "~/containers/ListeBlanche";
import { ListeBlancheFilter } from "~/containers/ListeBlancheFilter";
import { ListeBlancheSummary } from "~/containers/ListeBlancheSummary";
import { UserContext } from "~/containers/UserContext";

function ListBlanchePage() {
  const user = useContext(UserContext);
  const [direction] = user.directions;
  const initialFilters = {};

  if (direction.type === "departemental") {
    initialFilters.departement = direction.departement.id;
  } else if (direction.type === "regional") {
    initialFilters.region = direction.region.id;
  }

  return (
    <LayoutDirection>
      <FiltersContextSerializableProvider
        useLocalStorage={true}
        initialFilters={initialFilters}
      >
        <BoxWrapper mt={4} px={1}>
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
  );
}

export default ListBlanchePage;
