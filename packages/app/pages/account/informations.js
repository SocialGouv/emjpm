import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MagistratTribunalInformations } from "../../src/components-v2/MagistratTribunalInformations";
import { MandatairesInformations } from "../../src/components-v2/MandatairesInformations";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  return (
    <LayoutMagistrat>
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
          <Box
            sx={{
              flexBasis: 420,
              flexGrow: 1,
              p: 1
            }}
          >
            <Heading2>Votre tribunal</Heading2>
            <UserInformations
              Component={props => <MagistratTribunalInformations {...props} mt="3" />}
            />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default withAuthSync(Informations);
