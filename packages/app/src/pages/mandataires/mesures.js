import React from "react";
import { Flex } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutMandataire } from "~/components/Layout";
import { MesureList } from "~/components/MesureList";
import { MesureListButtonBar } from "~/components/MesureListButtonBar";
import { MesureListFilters } from "~/components/MesureListFilters";
import { FiltersContextProvider } from "~/components/MesureListFilters/context";
import {
  DEFAULT_MESURE_NATURE,
  MESURE_STATUS_LABEL_VALUE,
} from "~/constants/mesures";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const MesuresListView = () => {
  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus: MESURE_STATUS_LABEL_VALUE[0],
        natureMesure: DEFAULT_MESURE_NATURE,
      }}
    >
      <LayoutMandataire>
        <BoxWrapper mt={6} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <HeadingTitle>Toutes vos mesures</HeadingTitle>
            <MesureListButtonBar />
          </Flex>
          <MesureListFilters />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MesureList />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </FiltersContextProvider>
  );
};

const MandataireMesuresList = () => {
  return <MesuresListView />;
};

export default withAuthSync(MandataireMesuresList);
