import React from "react";
import { Card, Heading0, Heading4 } from "@socialgouv/emjpm-ui-core";
import { Box, Flex } from "rebass";
import { DirectionIndicator, NewMesureIndicator } from "../src/components-v2/direction-indicators";
import { Filters } from "../src/components-v2/filters";
import { FiltersContextProvider } from "../src/components-v2/filters/context";
import { Layout } from "../src/components-v2/layout";
import { Map } from "../src/components-v2/map";
import { MesureAllocation } from "../src/components-v2/mesureAllocation";
import { MesureEvolution } from "../src/components-v2/mesureEvolution";
const links = [
  {
    title: "mesures",
    url: "/direction"
  },
  {
    title: "mandataires",
    url: "/mandataires"
  }
];

const direction = () => {
  return (
    <FiltersContextProvider>
      <Layout links={links}>
        <Filters />
        <Box mt={5}>
          <Flex justifyContent="space-between" flex={"wrap"}>
            <NewMesureIndicator />
            <DirectionIndicator title="Mesures disponibles" indicator="4"></DirectionIndicator>
            <DirectionIndicator title="Nouvelle mesures" indicator="5"></DirectionIndicator>
            <DirectionIndicator title="Mesures éteintes" indicator="6"></DirectionIndicator>
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
      </Layout>
    </FiltersContextProvider>
  );
};

export default direction;
