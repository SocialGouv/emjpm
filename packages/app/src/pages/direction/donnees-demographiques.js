import { Box } from "rebass";

import { DirectionFilters } from "~/components/DirectionFilters";
import { ServicesIndicator } from "~/components/DirectionIndicators";
import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "~/ui";

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
