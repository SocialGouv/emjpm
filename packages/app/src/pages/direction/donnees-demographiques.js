import { Box } from "rebass";

import { DirectionFilters } from "~/containers/DirectionFilters";
import { ServicesIndicator } from "~/containers/DirectionIndicators";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { LayoutDirection } from "~/containers/Layout";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "~/components/Grid";

function DemographicDatas() {
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
}

export default DemographicDatas;
