import React from "react";
import { Box } from "rebass";

import { DirectionFilters } from "~/components/DirectionFilters";
import {
  AvailableMesureIndicator,
  EtablissementIndicator,
  MandatairesIndicator,
  ServicesIndicator,
} from "~/components/DirectionIndicators";
import { MandatairesList } from "~/components/DirectionMandatairesList";
import { MandatairesSubNavigation } from "~/components/DirectionMandatairesSubNavigation";
import { FiltersContextSerializableProvider } from "~/components/FiltersContextSerializable";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "~/ui";
import { withAuthSync } from "~/util/auth";

const Mandataires = () => {
  return (
    <FiltersContextSerializableProvider>
      <LayoutDirection>
        <BoxWrapper mt={5} px="1">
          <DirectionFilters useNameFilter={true} />
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
    </FiltersContextSerializableProvider>
  );
};

export default withAuthSync(Mandataires);
