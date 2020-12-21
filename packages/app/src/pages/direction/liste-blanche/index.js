import React from "react";
import { Box, Flex } from "rebass";

import { FiltersContextSerializableProvider } from "~/components/FiltersContextSerializable";
import { LayoutDirection } from "~/components/Layout";
import { ListeBlanche } from "~/components/ListeBlanche";
import { ListeBlancheFilter } from "~/components/ListeBlancheFilter";
import { ListeBlancheSummary } from "~/components/ListeBlancheSummary";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const ListBlanchePage = () => {
  return (
    <LayoutDirection>
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
              <ListeBlanche origin="direction" />
            </Box>
          </Flex>
        </BoxWrapper>
      </FiltersContextSerializableProvider>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
