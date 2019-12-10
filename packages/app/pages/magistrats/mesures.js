import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "../../src/components/Layout";
import { MagistratFilters } from "../../src/components/MagistratFilters";
import { FiltersContextProvider } from "../../src/components/MagistratFilters/context";
import { MagistratMesures } from "../../src/components/MagistratMesures";
import { withAuthSync } from "../../src/util/auth";

const Mesures = () => {
  return (
    <FiltersContextProvider>
      <LayoutMagistrat>
        <BoxWrapper mt={6} px="1">
          <Heading1>Toutes vos mesures</Heading1>
          <MagistratFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <MagistratMesures />
          </Flex>
        </BoxWrapper>
      </LayoutMagistrat>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
