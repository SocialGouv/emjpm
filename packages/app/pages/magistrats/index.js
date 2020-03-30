import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "../../src/components/Layout";
import { MagistratMandatairesList } from "../../src/components/MagistratMandatairesList";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Heading1>Tous les mandataires</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2"
          }}
        >
          <MagistratMandatairesList />
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default withAuthSync(Mandataires);
