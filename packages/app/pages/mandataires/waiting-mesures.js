import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "../../src/components/Layout";
import { MesureList } from "../../src/components/MesureList";
import { MesureListFilters } from "../../src/components/MesureListFilters";
import { FiltersContextProvider } from "../../src/components/MesureListFilters/context";
import { DEFAULT_MESURE_NATURE } from "../../src/constants/mesures";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <FiltersContextProvider
      initialValues={{
        natureMesure: DEFAULT_MESURE_NATURE,
      }}
    >
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Heading1>Vos mesures en attente</Heading1>
          <MesureListFilters isStatusHidden />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MesureList isOnlyWaiting />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mandataires);
