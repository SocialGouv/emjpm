import React from "react";
import { Box } from "rebass";
import { Card, BoxWrapper } from "@socialgouv/emjpm-ui-core";

import { AntennesStyle } from "./style";

const Antennes = props => {
  return (
    <BoxWrapper>
      <Box sx={AntennesStyle} {...props}>
        <Card>Tile</Card>
        <Card>Tile</Card>
        <Card>Tile</Card>
      </Box>
    </BoxWrapper>
  );
};

export { Antennes };
