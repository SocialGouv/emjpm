import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireFilters } from "../../src/components/MandataireFilters";
import { FiltersContextProvider } from "../../src/components/MandataireFilters/context";
import { MandataireMesures } from "../../src/components/MandataireMesures";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <FiltersContextProvider>
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Heading1>Vos mesures en attente</Heading1>
          <MandataireFilters isStatusHidden />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
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
