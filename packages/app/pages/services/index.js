import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../src/components/Commons";
import { LayoutServices } from "../../src/components/Layout";
import { ServiceFilters } from "../../src/components/ServiceFilters";
import { FiltersContextProvider } from "../../src/components/ServiceFilters/context";
import { ServiceMesures } from "../../src/components/ServiceMesures";
import { UserContext } from "../../src/components/UserContext";
import { DEFAULT_MESURE_TYPE, MESURE_STATUS_LABEL_VALUE } from "../../src/constants/mesures";
import { withAuthSync } from "../../src/util/auth";

const Mesures = () => {
  const { service_members } = useContext(UserContext);
  const [
    {
      service: { service_antennes }
    }
  ] = service_members;

  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus: MESURE_STATUS_LABEL_VALUE[0],
        mesureType: DEFAULT_MESURE_TYPE
      }}
    >
      <LayoutServices>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
            <Box flexDirection="row">
              <Flex flexDirection="row">
                <Box>
                  <LinkButton href="/services/add-mesures">Ajouter une mesure</LinkButton>
                </Box>
                <Box ml={1}>
                  <LinkButton href="/services/mesures/import">Importez vos mesures</LinkButton>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <ServiceFilters service_antennes={service_antennes} />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <ServiceMesures />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
