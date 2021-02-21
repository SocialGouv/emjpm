import { useQuery } from "@apollo/client";
import { useContext } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Indicator } from "~/components";

import { GET_CLOSED_MESURE_NUMBER } from "./queries";

function ClosedMesureIndicator() {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_CLOSED_MESURE_NUMBER, {
    variables: {
      departementCode: filters.departement ? filters.departement : undefined,
      end: filters.endDate || null,
      regionId: filters.region ? parseInt(filters.region) : undefined,
      start: filters.startDate || null,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const {
    stat_closed_mesures: { closed_mesures_nb },
  } = data;

  let title = "Mesures éteintes";
  if (filters.departement) {
    title += " dans le département";
  } else if (filters.region) {
    title += " dans la région";
  }

  return (
    <Indicator
      error={error}
      loading={loading}
      title={title}
      indicator={closed_mesures_nb ? Number(closed_mesures_nb) : 0}
    />
  );
}

export { ClosedMesureIndicator };
