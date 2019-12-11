import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMagistrat } from "../../src/components/Layout";
import { MagistratInformations } from "../../src/components/MagistratInformations";
import { MagistratTribunalInformations } from "../../src/components/MagistratTribunalInformations";
import { UserInformations } from "../../src/components/UserInformations";
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
                return <MagistratInformations {...props} mt="3" />;
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
