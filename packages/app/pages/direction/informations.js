import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { DirectionInformations } from "../../src/components/DirectionInformations";
import { LayoutDirection } from "../../src/components/Layout";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="0">
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
              p: 1
            }}
          >
            <Heading2>Informations générales</Heading2>
            <UserInformations
              Component={props => {
                return <DirectionInformations {...props} mt="3" />;
              }}
            />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(Informations);
