import React from "react";

import { Box } from "rebass";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@socialgouv/emjpm-ui-core";

import { withAuthSync } from "../../src/util/auth";
import { LayoutDirection } from "../../src/components-v2/Layout";
import { FiltersContextProvider } from "../../src/components-v2/Filters/context";
import { Filters } from "../../src/components-v2/Filters";
import { ServicesIndicator } from "../../src/components-v2/Indicators";

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
