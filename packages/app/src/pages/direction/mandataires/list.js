import { Helmet } from "react-helmet";

import { DirectionFilters } from "~/containers/DirectionFilters";
import { DirectionStatsKPI } from "~/containers/DirectionIndicators";
import { MandatairesList } from "~/containers/DirectionMandatairesList";
import { MandatairesSubNavigation } from "~/containers/DirectionMandatairesSubNavigation";
import { FiltersContextSerializableProvider } from "~/containers/FiltersContextSerializable";
import { LayoutDirection } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper, FlexWrapper } from "~/components/Grid";

function Mandataires() {
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
        <title>Liste des mandataires | e-MJPM</title>
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
            <MandatairesList />
          </FlexWrapper>
        </LayoutDirection>
      </FiltersContextSerializableProvider>
    </>
  );
}

export default Mandataires;
