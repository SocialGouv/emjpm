import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../src/components-v2/Commons";
import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceMesures } from "../../src/components-v2/ServiceMesures";
import { ServicesFilters } from "../../src/components-v2/ServicesFilters";
import { FiltersContextProvider } from "../../src/components-v2/ServicesFilters/context";
import { UserInformations } from "../../src/components-v2/UserInformations";
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
