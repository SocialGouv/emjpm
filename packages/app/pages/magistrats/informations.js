import React from "react";
import { Box, Flex } from "rebass";
import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";

import { withAuthSync } from "../../src/util/auth";
import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MagistratInformations } from "../../src/components-v2/MagistratInformations";
import { MagistratTribunalInformations } from "../../src/components-v2/MagistratTribunalInformations";
import { UserInformations } from "../../src/components-v2/UserInformations";

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
              p: 1,
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320
            }}
          >
            <Heading2>Informations générales</Heading2>
            <UserInformations
              Component={props => {
                return <MagistratInformations {...props} mt="3" />;
              }}
            />
          </Box>
          <Box
            sx={{
              p: 1,
              flexGrow: 1,
              flexBasis: 420
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
