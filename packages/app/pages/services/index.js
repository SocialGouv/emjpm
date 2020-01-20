import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../src/components/Commons";
import { LayoutServices } from "../../src/components/Layout";
import { ServiceFilters } from "../../src/components/ServiceFilters";
import { FiltersContextProvider } from "../../src/components/ServiceFilters/context";
import { ServiceMesures } from "../../src/components/ServiceMesures";
import { UserContext } from "../../src/components/UserContext";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Mesures = () => {
  const { service_members } = useContext(UserContext);
  const [
    {
      service: { service_antennes }
    }
  ] = service_members;

  return (
    <FiltersContextProvider>
      <LayoutServices>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
            <Box>
              <LinkButton href="/services/add-mesures">Ajouter une mesure</LinkButton>
            </Box>
          </Flex>

          <ServiceFilters service_antennes={service_antennes} />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <UserInformations Component={props => <ServiceMesures {...props} />} />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
