import React from "react";
import { Card, Heading, Spinner } from "~/components";
import France from "@socialgouv/react-departements/esm";
import { Box, Flex } from "rebass";
import { departementList } from "~/utils/geodata";
import isInt from "~/utils/std/isInt";

export function IndicatorsMap() {
  const departements = departementList.map(({ code }) => {
    if (!isInt(code)) {
      return code.toLowerCase(); // 2a, 2b
    }
    return parseInt(code);
  });
  return (
    <Card>
      <Heading size={1} py="5">
        Départements déployés
      </Heading>
      <Flex justifyContent="center">
        <France departements={departements} />
      </Flex>
    </Card>
  );
}
