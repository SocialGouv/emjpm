import { useContext } from "react";
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
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "~/components/Grid";

function Mandataires() {
  const user = useContext(UserContext);
  const [direction] = user.directions;
  const initialFilters = {};

  if (direction.type === "departemental") {
    initialFilters.departement = {
      id: direction.departement.id,
      label: direction.departement.nom,
    };
  } else if (direction.type === "regional") {
    initialFilters.region = {
      id: direction.region.id,
      label: direction.region.nom,
    };
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
