import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceAntennes } from "../../src/components/ServiceAntennes";
import { PreferencesPanel } from "../../src/components/ServiceSidebar";
import { ServicesInformations } from "../../src/components/ServicesInformations";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  return (
    <LayoutServices>
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
            <Heading2>Informations générales de votre service</Heading2>
            <UserInformations Component={props => <ServicesInformations {...props} mt="3" />} />
          </Box>
          <Box
            sx={{
              flexBasis: 320,
              flexGrow: 1,
              p: 1
            }}
          >
            <Heading2>Mesures souhaitées</Heading2>
            <UserInformations Component={props => <PreferencesPanel {...props} mt="3" />} />
          </Box>
        </Flex>
        <Box
          sx={{
            p: 1
          }}
        >
          <ServiceAntennes mt="1" />
        </Box>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(Informations);
