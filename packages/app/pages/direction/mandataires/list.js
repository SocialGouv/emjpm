import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { withAuthSync } from "../../../src/util/auth";
import { Filters } from "../../../src/components-v2/Filters";
import { FiltersContextProvider } from "../../../src/components-v2/Filters/context";
import {
  AvailableMesureIndicator,
  EtablissementIndicator,
  MandatairesIndicator,
  ServicesIndicator
} from "../../../src/components-v2/Indicators";
import { LayoutDirection } from "../../../src/components-v2/Layout";
import { MandatairesSubNavigation } from "../../../src/components-v2/MandatairesSubNavigation";
import { MandatairesList } from "../../../src/components-v2/MandatairesList";

const Mandataires = () => {
  return (
    <FiltersContextProvider>
      <LayoutDirection>
        <BoxWrapper mt={5} px="1">
          <Filters />
        </BoxWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={fourColumnStyle}>
            <ServicesIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <MandatairesIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <EtablissementIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <AvailableMesureIndicator />
          </Box>
        </FlexWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <MandatairesSubNavigation />
        </FlexWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <MandatairesList />
        </FlexWrapper>
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mandataires);
