import { Flex } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutMagistrat } from "~/components/Layout";
import { MagistratFilters } from "~/components/MagistratFilters";
import { FiltersContextProvider } from "~/components/MagistratFilters/context";
import { MagistratMesures } from "~/components/MagistratMesures";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { BoxWrapper } from "~/ui";

export default function Mesures() {
  return (
    <FiltersContextProvider
      initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}
    >
      <LayoutMagistrat>
        <BoxWrapper mt={6} px="1">
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
