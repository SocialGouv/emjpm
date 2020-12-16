import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratFilters } from "~/components/MagistratFilters";
import { FiltersContextProvider } from "~/components/MagistratFilters/context";
import { MagistratMesures } from "~/components/MagistratMesures";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { withAuthSync } from "~/util/auth";

const Mesures = () => {
  return (
    <FiltersContextProvider
      initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}
    >
      <LayoutMagistrat>
        <BoxWrapper mt={6} px="1">
          <Heading1>Toutes vos mesures</Heading1>
          <MagistratFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
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
