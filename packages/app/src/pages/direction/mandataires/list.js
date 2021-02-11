import { Box } from "rebass";

import { DirectionFilters } from "~/containers/DirectionFilters";
import {
  AvailableMesureIndicator,
  ClosedMesureIndicator,
  EtablissementIndicator,
  MandatairesIndicator,
  OpenMesureIndicator,
  ServicesIndicator,
} from "~/containers/DirectionIndicators";
import { MandatairesList } from "~/containers/DirectionMandatairesList";
import { MandatairesSubNavigation } from "~/containers/DirectionMandatairesSubNavigation";
import { FiltersContextSerializableProvider } from "~/containers/FiltersContextSerializable";
import { LayoutDirection } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "~/components/Grid";

function Mandataires() {
  const user = useUser();
  const [direction] = user.directions;
  const initialFilters = {};

  if (direction.type === "departemental") {
    initialFilters.departement = direction.departement.id;
  } else if (direction.type === "regional") {
    initialFilters.region = direction.region.id;
  }

  return (
    <FiltersContextSerializableProvider
      useLocalStorage={true}
      initialFilters={initialFilters}
    >
      <LayoutDirection>
        <BoxWrapper mt={5} px="1">
          <DirectionFilters />
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
          <Box sx={fourColumnStyle}>
            <OpenMesureIndicator />
          </Box>
          <Box sx={fourColumnStyle}>
            <ClosedMesureIndicator />
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
}

export default Mandataires;
