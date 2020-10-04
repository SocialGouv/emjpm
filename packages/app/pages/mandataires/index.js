import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireFilters } from "../../src/components/MandataireFilters";
import { FiltersContextProvider } from "../../src/components/MandataireFilters/context";
import { MandataireMesures } from "../../src/components/MandataireMesures";
import { MesureButtonBar } from "../../src/components/MesureButtonBar";
import { DEFAULT_MESURE_NATURE, MESURE_STATUS_LABEL_VALUE } from "../../src/constants/mesures";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus: MESURE_STATUS_LABEL_VALUE[0],
        natureMesure: DEFAULT_MESURE_NATURE,
      }}
    >
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
            <MesureButtonBar />
          </Flex>
          <MandataireFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MandataireMesures />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mandataires);
