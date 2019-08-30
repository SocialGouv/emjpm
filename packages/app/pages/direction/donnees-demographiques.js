import React from "react";

import { Box } from "rebass";

import { FiltersContextProvider } from "../../src/components-v2/filters/context";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@socialgouv/emjpm-ui-core";
import { Filters } from "../../src/components-v2/filters";
import { LayoutDirection } from "../../src/presentationalComponents/layout";
import { ServicesIndicator } from "../../src/components-v2/directionIndicators";

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

export default DemographicDatas;
