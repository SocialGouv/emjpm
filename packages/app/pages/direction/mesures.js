import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { withAuthSync } from "../../src/util/auth";
import { Filters } from "../../src/components-v2/Filters";
import { FiltersContextProvider } from "../../src/components-v2/Filters/context";
import {
  ClosedMesureIndicator,
  NewMesureIndicator,
  OpenMesureIndicator
} from "../../src/components-v2/Indicators";
import { LayoutDirection } from "../../src/components-v2/Layout";
import { MesureAllocation } from "../../src/components-v2/MesureAllocation";
import { MesureEvolution } from "../../src/components-v2/MesureEvolution";

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
