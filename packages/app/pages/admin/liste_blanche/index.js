import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutAdmin } from "../../../src/components/Layout";
import { ListeBlanche } from "../../../src/components/ListeBlanche";
import { ListeBlancheFilter } from "../../../src/components/ListeBlancheFilter";
import { FiltersContextProvider } from "../../../src/components/ListeBlancheFilter/context";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => {
  return (
    <FiltersContextProvider>
      <LayoutAdmin>
        <BoxWrapper mt={4} px={1}>
          <Flex flexDirection="column">
            <Box mb="2">
              <ListeBlancheFilter />
            </Box>
            <Flex>
              <ListeBlanche />
            </Flex>
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </FiltersContextProvider>
  );
};

export default withAuthSync(ListBlanchePage);
