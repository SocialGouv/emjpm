import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import { DirectionFilters } from "../../src/components/DirectionFilters";
import {
  ClosedMesureIndicator,
  NewMesureIndicator,
  OpenMesureIndicator,
} from "../../src/components/DirectionIndicators";
import { MesureAllocation } from "../../src/components/DirectionMesureAllocation";
import { MesureEvolution } from "../../src/components/DirectionMesureEvolution";
import { FiltersContextSerializableProvider } from "../../src/components/FiltersContextSerializable";
import { LayoutDirection } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";
import { endDate, startDate } from "../../src/util/dates";

const Mesures = () => {
  return (
    <FiltersContextSerializableProvider
      useLocalStorage={true}
      initialFilters={{ endDate, startDate }}
    >
      <LayoutDirection>
        <BoxWrapper mt={5} px="1">
          <DirectionFilters />
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
    </FiltersContextSerializableProvider>
  );
};

export default withAuthSync(Mesures);
