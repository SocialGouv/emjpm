import { Card, Heading0, Heading4 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";
import { Filters } from "../src/components-v2/filters";
import { FiltersContextProvider } from "../src/components-v2/filters/context";
import { Layout } from "../src/components-v2/layout";

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
            <Card flexBasis="250px">
              <Heading4>Mesures en cours</Heading4>
              <Heading0 mt={"7"}>3949</Heading0>
            </Card>
            <Card flexBasis="250px">
              <Heading4>Mesures disponibles</Heading4>
              <Heading0 mt={"7"}>399</Heading0>
            </Card>
            <Card flexBasis="250px">
              <Heading4>Nouvelles mesures</Heading4>
              <Heading0 mt={"7"}>349</Heading0>
            </Card>
            <Card flexBasis="250px">
              <Heading4>Mesure éteintes</Heading4>
              <Heading0 mt={"7"}>30949</Heading0>
            </Card>
          </Flex>
        </Box>
      </Layout>
    </FiltersContextProvider>
  );
};

export default direction;
