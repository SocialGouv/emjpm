import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "../../src/components-v2/Layout";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <Flex flexDirection="row" justifyContent="space-between">
          <Heading1>Toutes vos mesures</Heading1>
        </Flex>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2"
          }}
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default withAuthSync(Mandataires);
