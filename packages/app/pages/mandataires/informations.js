import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataire } from "../../src/components-v2/Layout";
import { MandatairesInformations } from "../../src/components-v2/MandatairesInformations";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  return (
    <LayoutMandataire>
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
                return <MandatairesInformations {...props} mt="3" />;
              }}
            />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(Informations);
