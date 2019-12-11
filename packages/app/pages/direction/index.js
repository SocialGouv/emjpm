import {
  BoxWrapper,
  FlexWrapper,
  fourColumnStyle,
  twoColumnStyle
} from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { AvailabilityMap } from "../../src/components/DirectionAvailabilityMap";
import { Filters } from "../../src/components/DirectionFilters";
import { FiltersContextProvider } from "../../src/components/DirectionFilters/context";
import {
  AvailableMesureIndicator,
  EtablissementIndicator,
  MandatairesIndicator,
  ServicesIndicator
} from "../../src/components/DirectionIndicators";
import { MandatairesActivity } from "../../src/components/DirectionMandatairesActivity";
// import { MandatairesCapacity } from "../../src/components/MandatairesCapacity";
import { MandatairesDisponibility } from "../../src/components/DirectionMandatairesDisponibility";
import { MandatairesSubNavigation } from "../../src/components/DirectionMandatairesSubNavigation";
import { LayoutDirection } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

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
          <Box sx={fourColumnStyle}>
            <AvailableMesureIndicator />
          </Box>
        </FlexWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <MandatairesSubNavigation />
        </FlexWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={twoColumnStyle}>
            <MandatairesDisponibility />
          </Box>

          <Box sx={twoColumnStyle}>
            <MandatairesActivity />
          </Box>
        </FlexWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={twoColumnStyle}>
            <AvailabilityMap />
          </Box>
          {/* <Box sx={twoColumnStyle}>
            <MandatairesCapacity />
          </Box> */}
        </FlexWrapper>
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mandataires);
