import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "../../src/components-v2/Layout";
import { MandataireFilters } from "../../src/components-v2/MandataireFilters";
import { FiltersContextProvider } from "../../src/components-v2/MandataireFilters/context";
import { MandatairesMesures } from "../../src/components-v2/MandatairesMesures";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <FiltersContextProvider>
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
          </Flex>
          <MandataireFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <MandatairesMesures />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mandataires);
