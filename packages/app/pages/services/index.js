import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../src/components/Commons";
import { LayoutServices } from "../../src/components/Layout";
import { ServiceMesures } from "../../src/components/ServiceMesures";
import { ServicesFilters } from "../../src/components/ServicesFilters";
import { FiltersContextProvider } from "../../src/components/ServicesFilters/context";
import { UserInformations } from "../../src/components/UserInformations";
import { withAuthSync } from "../../src/util/auth";

const Mesures = () => {
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

          <UserInformations Component={props => <ServicesFilters {...props} />} />
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
