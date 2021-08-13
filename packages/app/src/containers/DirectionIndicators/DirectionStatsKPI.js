import { useContext } from "react";
import { Box } from "rebass";

import { Indicator } from "~/components";
import { FlexWrapper, fiveColumnStyle } from "~/components/Grid";
import { useQuery } from "@apollo/client";
import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { GET_DIRECTION_STATS_KPI } from "./queries";

export default function DirectionStatsKPI() {
  const { filters } = useContext(FiltersContextSerializable);

  const { data, loading, error } = useQuery(GET_DIRECTION_STATS_KPI, {
    variables: {
      departementCode: filters.departement ? filters.departement : undefined,
      regionId: filters.region ? parseInt(filters.region) : undefined,
    },
  });
  useQueryReady(loading, error);

  let titleOpenedMesures = "Mesures en cours";
  let titleClosedMesures = "Mesures éteintes";
  if (filters.departement) {
    titleOpenedMesures += " dans le département";
    titleClosedMesures += " dans le département";
  } else if (filters.region) {
    titleOpenedMesures += " dans la région";
    titleClosedMesures += " dans la région";
  }

  return (
    <>
      <FlexWrapper flexWrap={"wrap"} mt={5}>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) =>
              data.gestionnaireServiceNumber
                ? Number(data.gestionnaireServiceNumber.aggregate.count)
                : 0
            }
            title="Services mandataires"
          />
        </Box>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) =>
              data.gestionnaireIndNumber
                ? Number(data.gestionnaireIndNumber.aggregate.count)
                : 0
            }
            title="Mandataires individuels"
          />
        </Box>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) =>
              data.gestionnairePreNumber
                ? Number(data.gestionnairePreNumber.aggregate.count)
                : 0
            }
            title="Préposés d'établissement"
          />
        </Box>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) => {
              const {
                stat_opened_mesures: { opened_mesures_nb },
              } = data;
              return opened_mesures_nb ? Number(opened_mesures_nb) : 0;
            }}
            title={titleOpenedMesures}
          />
        </Box>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) => {
              const {
                stat_closed_mesures: { closed_mesures_nb },
              } = data;
              return closed_mesures_nb ? Number(closed_mesures_nb) : 0;
            }}
            title={titleClosedMesures}
          />
        </Box>
      </FlexWrapper>
      <FlexWrapper flexWrap={"wrap"} mt={5}>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) =>
              data.stat_available_mesures.available_mesures_nb_real
            }
            title="Places disponibles"
          />
        </Box>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) =>
              data.stat_available_mesures.available_mesures_nb_over
            }
            title="Surcapacité"
          />
        </Box>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) =>
              data.stat_available_mesures.available_mesures_nb_global
            }
            title="Disponibilité totale"
          />
        </Box>
        <Box sx={fiveColumnStyle}>
          <Indicator
            error={error}
            loading={loading}
            data={data}
            load={(data) => {
              const { available_mesures_nb_unknown_gestion } =
                data.stat_available_mesures;
              return available_mesures_nb_unknown_gestion
                ? Number(available_mesures_nb_unknown_gestion)
                : 0;
            }}
            title="Mandataires capacité non renseignée"
          />
        </Box>
      </FlexWrapper>
    </>
  );
}
