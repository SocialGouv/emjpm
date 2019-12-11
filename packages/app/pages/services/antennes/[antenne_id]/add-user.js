import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "../../../../src/components/Layout";
import { withAuthSync } from "../../../../src/util/auth";

const AddUser = () => {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <Heading1>Toutes vos mesures</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320,
              p: 3
            }}
          >
            Mesures list
          </Box>
          <Box
            sx={{
              flexBasis: 256,
              flexGrow: 1,
              p: 3
            }}
          >
            map and other stuff
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(AddUser);
