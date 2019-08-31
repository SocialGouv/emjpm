import React from "react";

import { Box } from "rebass";
import {
  FlexWrapper,
  BoxWrapper,
  fourColumnStyle,
  twoColumnStyle
} from "@socialgouv/emjpm-ui-core";

import { LayoutDirection } from "../../src/components-v2/Layout";
import { Filters } from "../../src/components-v2/Filters";
import { FiltersContextProvider } from "../../src/components-v2/Filters/context";
import { AvailabilityMap } from "../../src/components-v2/AvailabilityMap";
import { MesureAllocation } from "../../src/components-v2/MesureAllocation";
import { MesureEvolution } from "../../src/components-v2/MesureEvolution";
import {
  NewMesureIndicator,
  ClosedMesureIndicator,
  OpenMesureIndicator,
  AvailableMesureIndicator
} from "../../src/components-v2/Indicators";

const Mesures = () => {
  return (
    <FiltersContextProvider>
      <LayoutDirection>
        <BoxWrapper mt={5} px="1">
          <Filters />
        </BoxWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={fourColumnStyle}>
            <OpenMesureIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <AvailableMesureIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <NewMesureIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <ClosedMesureIndicator />
          </Box>
        </FlexWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={twoColumnStyle}>
            <AvailabilityMap />
          </Box>
          <Box sx={twoColumnStyle}>
            <MesureAllocation />
          </Box>
        </FlexWrapper>
        <BoxWrapper mt={5} px="1">
          <MesureEvolution />
        </BoxWrapper>
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default Mesures;
