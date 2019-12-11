import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { Filters } from "../../src/components/DirectionFilters";
import { FiltersContextProvider } from "../../src/components/DirectionFilters/context";
import {
  ClosedMesureIndicator,
  NewMesureIndicator,
  OpenMesureIndicator
} from "../../src/components/DirectionIndicators";
import { MesureAllocation } from "../../src/components/DirectionMesureAllocation";
import { MesureEvolution } from "../../src/components/DirectionMesureEvolution";
import { LayoutDirection } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

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
            <NewMesureIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <ClosedMesureIndicator />
          </Box>
        </FlexWrapper>
        <BoxWrapper mt={5} px="1">
          <MesureAllocation />
        </BoxWrapper>
        <BoxWrapper mt={5} px="1">
          <MesureEvolution />
        </BoxWrapper>
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
