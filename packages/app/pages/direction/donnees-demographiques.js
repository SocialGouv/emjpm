import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { Filters } from "../../src/components/DirectionFilters";
import { FiltersContextProvider } from "../../src/components/DirectionFilters/context";
import { ServicesIndicator } from "../../src/components/DirectionIndicators";
import { LayoutDirection } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const DemographicDatas = () => {
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
        </FlexWrapper>
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default withAuthSync(DemographicDatas);
