import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../src/components/Commons";
import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireFilters } from "../../src/components/MandataireFilters";
import { FiltersContextProvider } from "../../src/components/MandataireFilters/context";
import { MandataireMesures } from "../../src/components/MandataireMesures";
import { MESURE_STATUS_LABEL_VALUE } from "../../src/constants/mesures";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  const mesureStatus = MESURE_STATUS_LABEL_VALUE[MESURE_STATUS_LABEL_VALUE.length - 1];

  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus
      }}
    >
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
            <Box>
              <LinkButton href="/mandataires/add-mesures">Ajouter une mesure</LinkButton>
            </Box>
          </Flex>
          <MandataireFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <MandataireMesures />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mandataires);
