import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { withAuthSync } from "../../src/util/auth";
import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MagistratMandatairesList } from "../../src/components-v2/MagistratMandatairesList";

const Mandataires = () => {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Heading1>Tous les mandataires</Heading1>
        <Flex
          sx={{
            mt: "2",
            flexWrap: "wrap"
          }}
        >
          <MagistratMandatairesList />
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default withAuthSync(Mandataires);
