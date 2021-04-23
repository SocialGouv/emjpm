import { Flex } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratFilters } from "~/containers/MagistratFilters";
import { FiltersContextProvider } from "~/containers/MagistratFilters/context";
import { MagistratMesures } from "~/containers/MagistratMesures";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { BoxWrapper } from "~/components/Grid";

export default function Mesures() {
  return (
    <FiltersContextProvider
      initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}
    >
      <LayoutMagistrat>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle>Toutes vos mesures</HeadingTitle>
          <MagistratFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MagistratMesures />
          </Flex>
        </BoxWrapper>
      </LayoutMagistrat>
    </FiltersContextProvider>
  );
}
