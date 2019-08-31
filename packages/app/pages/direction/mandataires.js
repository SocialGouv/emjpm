import React from "react";

import { Box } from "rebass";
import {
  BoxWrapper,
  FlexWrapper,
  fourColumnStyle
  // twoColumnStyle
} from "@socialgouv/emjpm-ui-core";

import { LayoutDirection } from "../../src/components-v2/Layout";
import { FiltersContextProvider } from "../../src/components-v2/Filters/context";
import { Filters } from "../../src/components-v2/Filters";
import {
  ServicesIndicator,
  MandatairesIndicator,
  EtablissementIndicator
} from "../../src/components-v2/Indicators";

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
