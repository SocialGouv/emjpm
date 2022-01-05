import { Flex } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutGreffier } from "~/containers/Layout";
import { GreffierFilters } from "~/containers/GreffierFilters";
import { FiltersContextProvider } from "~/containers/GreffierFilters/context";
import { GreffierMesures } from "~/containers/GreffierMesures";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

export default function Mesures() {
  return (
    <>
      <Helmet>
        <title>Toutes vos mesures | e-MPJM </title>
      </Helmet>
      <FiltersContextProvider
        initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}
      >
        <LayoutGreffier>
          <BoxWrapper mt={3} px="1">
            <HeadingTitle>Toutes vos mesures</HeadingTitle>
            <GreffierFilters />
            <Flex
              sx={{
                flexWrap: "wrap",
                mt: "2",
              }}
            >
              <GreffierMesures />
            </Flex>
          </BoxWrapper>
        </LayoutGreffier>
      </FiltersContextProvider>
    </>
  );
}
