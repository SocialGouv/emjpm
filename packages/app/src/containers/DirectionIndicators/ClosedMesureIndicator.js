import { useQuery } from "@apollo/client";
import { useContext } from "react";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Indicator } from "~/components";

import { GET_CLOSED_MESURE_NUMBER } from "./queries";

function ClosedMesureIndicator() {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_CLOSED_MESURE_NUMBER, {
    variables: {
      departementCode: filters.departement
        ? parseInt(filters.departement)
        : undefined,
      end: filters.endDate,
      regionId: filters.region ? parseInt(filters.region) : undefined,
      start: filters.startDate,
    },
  });

  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  const {
    stat_closed_mesures: { closed_mesures_nb },
  } = data;

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mesures éteintes"
      indicator={closed_mesures_nb ? Number(closed_mesures_nb) : 0}
    />
  );
}

export { ClosedMesureIndicator };
