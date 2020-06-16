import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireFilters } from "../../src/components/MandataireFilters";
import { FiltersContextProvider } from "../../src/components/MandataireFilters/context";
import { MandataireMesures } from "../../src/components/MandataireMesures";
import { DEFAULT_MESURE_TYPE } from "../../src/constants/mesures";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <FiltersContextProvider
      initialValues={{
        mesureType: DEFAULT_MESURE_TYPE,
      }}
    >
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Heading1>Vos mesures en attente</Heading1>
          <MandataireFilters isStatusHidden />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MandataireMesures isOnlyWaiting />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mandataires);
