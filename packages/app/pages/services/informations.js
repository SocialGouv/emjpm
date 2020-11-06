import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Card } from "rebass";

import { LayoutServices } from "../../src/components/Layout";
import { ServiceAntennes } from "../../src/components/ServiceAntennes";
import { ServiceInformations } from "../../src/components/ServiceInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => {
  return (
    <LayoutServices>
      <BoxWrapper m={2} px="1">
        <Card p="5" m={2}>
          <ServiceInformations mt="3" />
        </Card>
        <Box m={2}>
          <ServiceAntennes />
        </Box>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(Informations);
