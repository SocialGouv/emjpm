import { Box } from "rebass";
import { Helmet } from "react-helmet";

import { AvailabilityMap } from "~/containers/DirectionAvailabilityMap";
import { DirectionFilters } from "~/containers/DirectionFilters";
import { DirectionStatsKPI } from "~/containers/DirectionIndicators";
import { MandatairesActivity } from "~/containers/DirectionMandatairesActivity";
import { MandatairesDisponibility } from "~/containers/DirectionMandatairesDisponibility";
import { MandatairesSubNavigation } from "~/containers/DirectionMandatairesSubNavigation";
import { FiltersContextSerializableProvider } from "~/containers/FiltersContextSerializable";
import { LayoutDirection } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper, FlexWrapper, twoColumnStyle } from "~/components/Grid";

export default function DirectionPage() {
  const user = useUser();
  const [direction] = user.directions;
  const initialFilters = {};

  if (direction?.type === "departemental") {
    initialFilters.departement = direction.departement.id;
  } else if (direction?.type === "regional") {
    initialFilters.region = direction.region.id.toString();
  }

  return (
    <>
      <Helmet>
        <title>Statistiques direction | e-MPJM</title>
      </Helmet>
      <FiltersContextSerializableProvider
        useLocalStorage={true}
        initialFilters={initialFilters}
      >
        <LayoutDirection>
          <BoxWrapper mt={5} px="1">
            <DirectionFilters />
          </BoxWrapper>
          <DirectionStatsKPI />
          <FlexWrapper flexWrap={"wrap"} mt={5}>
            <MandatairesSubNavigation />
          </FlexWrapper>
          <FlexWrapper flexWrap={"wrap"} mt={5}>
            <Box sx={twoColumnStyle}>
              <MandatairesDisponibility />
            </Box>

            <Box sx={twoColumnStyle}>
              <MandatairesActivity />
            </Box>
          </FlexWrapper>
          <FlexWrapper flexWrap={"wrap"} mt={5}>
            <Box sx={twoColumnStyle}>
              <AvailabilityMap />
            </Box>
          </FlexWrapper>
        </LayoutDirection>
      </FiltersContextSerializableProvider>
    </>
  );
}
