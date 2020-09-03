import { BoxWrapper, FlexWrapper, fourColumnStyle } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import { DirectionFilters } from "../../src/components/DirectionFilters";
import { ServicesIndicator } from "../../src/components/DirectionIndicators";
import { FiltersContextSerializable } from "../../src/components/FiltersContextSerializable";
import { LayoutDirection } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const DemographicDatas = () => {
  return (
    <FiltersContextSerializable>
      <LayoutDirection>
        <BoxWrapper mt={5} px="1">
          <DirectionFilters />
        </BoxWrapper>
        <FlexWrapper flexWrap={"wrap"} mt={5}>
          <Box sx={fourColumnStyle}>
            <ServicesIndicator />
          </Box>
        </FlexWrapper>
      </LayoutDirection>
    </FiltersContextSerializable>
  );
};

export default withAuthSync(DemographicDatas);
