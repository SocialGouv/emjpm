import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutDirection } from "../../../src/components/Layout";
import { ListeBlanche } from "../../../src/components/ListeBlanche";
import { ListeBlancheFilter } from "../../../src/components/ListeBlancheFilter";
import { FiltersContextSerializableProvider } from "../../../src/components/ListeBlancheFilter/context";
import { ListeBlancheSummary } from "../../../src/components/ListeBlancheSummary";
import { withAuthSync } from "../../../src/util/auth";

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
