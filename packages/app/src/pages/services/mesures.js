import { useContext } from "react";
import { Flex, Text } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutServices } from "~/components/Layout";
import { MesureBadge } from "~/components/MesureBadge";
import { MesureList } from "~/components/MesureList";
import { MesureListButtonBar } from "~/components/MesureListButtonBar";
import { MesureListFilters } from "~/components/MesureListFilters";
import { FiltersContextProvider } from "~/components/MesureListFilters/context";
import { UserContext } from "~/components/UserContext";
import {
  DEFAULT_MESURE_NATURE,
  MESURE_STATUS_LABEL_VALUE,
} from "~/constants/mesures";
import { BoxWrapper } from "~/ui";

export default function Mesures() {
  const { service_members } = useContext(UserContext);
  const [
    {
      service: { service_antennes },
    },
  ] = service_members;

  return (
    <FiltersContextProvider
      initialValues={{
        mesureStatus: MESURE_STATUS_LABEL_VALUE[0],
        natureMesure: DEFAULT_MESURE_NATURE,
      }}
    >
      <LayoutServices>
        <BoxWrapper mt={2} px="1">
          <Flex flexDirection="row" justifyContent="space-between">
            <HeadingTitle>Toutes vos mesures</HeadingTitle>
            <MesureListButtonBar />
          </Flex>
          <Flex mt={1} flexDirection="row" justifyContent="flex-start">
            {service_antennes.map((antenne) => (
              <Flex
                flexDirection="column"
                alignItems="flex-start"
                key={antenne.id}
                mr={2}
                sx={{ bg: "white", borderRadius: "20px", px: "2" }}
              >
                <Text>{antenne.name}</Text>
                <MesureBadge
                  mesures_en_cours={antenne.mesures_in_progress}
                  dispo_max={antenne.mesures_max}
                />
              </Flex>
            ))}
          </Flex>

          <MesureListFilters service_antennes={service_antennes} />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "1",
            }}
          >
            <MesureList />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
}
