import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LinkButton } from "../../src/components/Commons";
import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireFilters } from "../../src/components/MandataireFilters";
import { FiltersContextProvider } from "../../src/components/MandataireFilters/context";
import { MandataireMesures } from "../../src/components/MandataireMesures";
import { DEFAULT_MESURE_NATURE, MESURE_STATUS_LABEL_VALUE } from "../../src/constants/mesures";
import { withAuthSync } from "../../src/util/auth";

const Mandataires = () => {
  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus: MESURE_STATUS_LABEL_VALUE[0],
        natureMesure: DEFAULT_MESURE_NATURE,
      }}
    >
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
            <Box flexDirection="row">
              <Flex flexDirection="row">
                <Box>
                  <LinkButton href="/mandataires/add-mesures">Ajouter une mesure</LinkButton>
                </Box>
                <Box ml={1}>
                  <LinkButton href="/mandataires/import-mesures">Importez vos mesures</LinkButton>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <MandataireFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
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
