import React from "react";
import { Box, Flex } from "rebass";
import {
  NewMesureIndicator,
  ClosedMesureIndicator,
  OpenMesureIndicator,
  AvailableMesureIndicator
} from "../../src/components-v2/direction-indicators";
import { Filters } from "../../src/components-v2/filters";
import { FiltersContextProvider } from "../../src/components-v2/filters/context";
import { LayoutDirection } from "../../src/components-v2/layout";
import { Map } from "../../src/components-v2/map";
import { MesureAllocation } from "../../src/components-v2/mesureAllocation";
import { MesureEvolution } from "../../src/components-v2/mesureEvolution";

const Mesures = () => {
  return (
    <FiltersContextProvider>
      <LayoutDirection>
        <Filters />
        <Box mt={5}>
          <Flex justifyContent="space-between" flex={"wrap"}>
            <OpenMesureIndicator />
            <AvailableMesureIndicator />
            <NewMesureIndicator />
            <ClosedMesureIndicator />
          </Flex>
        </Box>
        <Box mt={5}>
          <Flex justifyContent="space-between" flex={"wrap"}>
            <Map />
            <MesureAllocation />
          </Flex>
        </Box>
        <Box mt={5}>
          <Flex justifyContent="space-between" flex={"wrap"}>
            <MesureEvolution />
          </Flex>
        </Box>
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default Mesures;
