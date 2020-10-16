import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React, { useContext } from "react";
import { Flex } from "rebass";

import { LayoutServices } from "../../src/components/Layout";
import { MesureList } from "../../src/components/MesureList";
import { MesureListButtonBar } from "../../src/components/MesureListButtonBar";
import { MesureListFilters } from "../../src/components/MesureListFilters";
import { FiltersContextProvider } from "../../src/components/MesureListFilters/context";
import { UserContext } from "../../src/components/UserContext";
import { DEFAULT_MESURE_NATURE, MESURE_STATUS_LABEL_VALUE } from "../../src/constants/mesures";
import { withAuthSync } from "../../src/util/auth";

const Mesures = () => {
  const { service_members } = useContext(UserContext);
  const [
    {
      service: { service_antennes },
    },
  ] = service_members;

  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus: MESURE_STATUS_LABEL_VALUE[0],
        natureMesure: DEFAULT_MESURE_NATURE,
      }}
    >
      <LayoutServices>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
            <MesureListButtonBar />
          </Flex>

          <MesureListFilters service_antennes={service_antennes} />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MesureList />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
