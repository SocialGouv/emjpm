import { Box, Flex } from "rebass";

import { FiltersContextSerializableProvider } from "~/components/FiltersContextSerializable";
import { LayoutAdmin } from "~/components/Layout";
import { ListeBlanche } from "~/components/ListeBlanche";
import { ListeBlancheFilter } from "~/components/ListeBlancheFilter";
import { ListeBlancheSummary } from "~/components/ListeBlancheSummary";
import { BoxWrapper } from "~/ui";

const ListBlanchePage = () => {
  return (
    <LayoutAdmin>
      <FiltersContextSerializableProvider useLocalStorage={true}>
        <BoxWrapper mt={4} px={1}>
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
  );
};

export default ListBlanchePage;
