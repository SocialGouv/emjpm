import { Flex, Text } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { MesureBadge } from "~/containers/MesureBadge";
import { MesureList } from "~/containers/MesureList";
import { MesureListButtonBar } from "~/containers/MesureListButtonBar";
import { MesureListFilters } from "~/containers/MesureListFilters";
import { FiltersContextProvider } from "~/containers/MesureListFilters/context";
import useUser from "~/hooks/useUser";
import {
  DEFAULT_MESURE_NATURE,
  MESURE_STATUS_LABEL_VALUE,
} from "~/constants/mesures";
import { BoxWrapper } from "~/components/Grid";
import { useState } from "react";

export default function Mesures() {
  const { service_members } = useUser();
  const [{ service }] = service_members;
  const { service_antennes, mesures_in_progress, dispo_max } = service;

  const sansAntenneEncours = service_antennes.reduce(
    (acc, { mesures_in_progress }) => {
      return acc - mesures_in_progress;
    },
    mesures_in_progress
  );
  const sansAntenneDispoMax = service_antennes.reduce(
    (acc, { mesures_max }) => {
      return acc - mesures_max;
    },
    dispo_max
  );

  const [mesuresCount, setMesuresCount] = useState(null);
  console.log(service);
  const mesuresTotal = service.mesures_in_progress + service.mesures_awaiting;

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
            <HeadingTitle>
              Vos mesures{" "}
              {mesuresCount !== null && (
                <Text fontSize="1" display="inline">
                  ({mesuresCount}/{mesuresTotal})
                </Text>
              )}
            </HeadingTitle>
            <MesureListButtonBar />
          </Flex>
          <Flex mt={1} flexDirection="row" justifyContent="flex-start">
            {service_antennes.map((antenne) => (
              <Flex
                flexDirection="column"
                alignItems="flex-start"
                key={antenne.id}
                mr={2}
                sx={{
                  bg: "white",
                  borderRadius: "20px",
                  px: "2",
                }}
              >
                <Text>{antenne.name}</Text>
                <MesureBadge
                  mesures_en_cours={antenne.mesures_in_progress}
                  dispo_max={antenne.mesures_max}
                />
              </Flex>
            ))}
            <Flex
              flexDirection="column"
              alignItems="flex-start"
              mr={2}
              sx={{
                bg: "white",
                borderRadius: "20px",
                px: "2",
                border: "1px dotted #545454 !important",
              }}
            >
              <Text>Sans antenne</Text>
              <MesureBadge
                mesures_en_cours={sansAntenneEncours}
                dispo_max={sansAntenneDispoMax}
              />
            </Flex>
          </Flex>

          <MesureListFilters service_antennes={service_antennes} />
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "1",
            }}
          >
            <MesureList setMesuresCount={setMesuresCount} />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
}
