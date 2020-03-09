import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Flex } from "rebass";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceFilters } from "../../src/components/ServiceFilters";
import { FiltersContextProvider } from "../../src/components/ServiceFilters/context";
import { ServiceMesures } from "../../src/components/ServiceMesures";
import { UserContext } from "../../src/components/UserContext";
import { DEFAULT_MESURE_TYPE } from "../../src/constants/mesures";
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
        mesureType: DEFAULT_MESURE_TYPE
      }}
    >
      <LayoutServices>
        <BoxWrapper mt={6} px="1">
          <Heading1>Toutes vos mesures en attente</Heading1>
          <ServiceFilters service_antennes={service_antennes} isStatusHidden />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <ServiceMesures isOnlyWaiting />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
