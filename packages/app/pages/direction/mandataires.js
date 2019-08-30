import React from "react";

import { Box } from "rebass";

import { FiltersContextProvider } from "../../src/components-v2/filters/context";
import {
  BoxWrapper,
  FlexWrapper,
  fourColumnStyle
  // twoColumnStyle
} from "@socialgouv/emjpm-ui-core";
import { Filters } from "../../src/components-v2/filters";
import { LayoutDirection } from "../../src/presentationalComponents/layout";
import {
  ServicesIndicator,
  MandatairesIndicator,
  EtablissementIndicator
} from "../../src/components-v2/directionIndicators";

const Mandataires = () => {
  return (
    <FiltersContextProvider>
      <LayoutDirection>
        <BoxWrapper mt={5} px="1">
          <Filters />
        </BoxWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={fourColumnStyle}>
            <ServicesIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <MandatairesIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <EtablissementIndicator />
          </Box>
        </FlexWrapper>
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default Mandataires;
