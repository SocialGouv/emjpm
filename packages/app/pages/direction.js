import React from "react";
import { Layout } from "../src/components-v2/layout";
import { Filters } from "../src/components-v2/filters";
import { Card, Heading4, Heading1 } from "@socialgouv/emjpm-ui-core";
import { Flex, Box } from "rebass";

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
    <Layout links={links}>
      <Filters />
      <Box mt={5}>
        <Flex justifyContent="space-between" flex={"wrap"}>
          <Card flexBasis="252px">
            <Heading4>Mesures en cours</Heading4>
            <Heading1 mt={"5"}>3949</Heading1>
          </Card>
          <Card flexBasis="252px">
            <Heading4>Mesures disponibles</Heading4>
            <Heading1 mt={"5"}>399</Heading1>
          </Card>
          <Card flexBasis="252px">
            <Heading4>Nouvelles mesures</Heading4>
            <Heading1 mt={"5"}>349</Heading1>
          </Card>
          <Card flexBasis="252px">
            <Heading4>Mesure éteintes</Heading4>
            <Heading1 mt={"5"}>30949</Heading1>
          </Card>
        </Flex>
      </Box>
    </Layout>
  );
};

export default direction;
