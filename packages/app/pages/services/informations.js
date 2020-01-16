import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceAntennes } from "../../src/components/ServiceAntennes";
import { ServiceInformations } from "../../src/components/ServiceInformations";
import { PreferencesPanel } from "../../src/components/ServiceSidebar";
import { UserContext } from "../../src/components/UserContext";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  const { service_admins } = useContext(UserContext);
  const [
    {
      service: { service_antennes }
    }
  ] = service_admins;
  const [antenne] = service_antennes;

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
            <UserInformations Component={props => <ServiceInformations {...props} mt="3" />} />
          </Box>
          <Box
            sx={{
              flexBasis: 320,
              flexGrow: 1,
              p: 1
            }}
          >
            <Heading2>Mesures souhaitées</Heading2>
            <PreferencesPanel antenneId={antenne.id} mt="3" />
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
