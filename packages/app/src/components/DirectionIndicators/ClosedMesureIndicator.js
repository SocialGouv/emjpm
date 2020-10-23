import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@emjpm/ui";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_CLOSED_MESURE_NUMBER } from "./queries";

const ClosedMesureIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_CLOSED_MESURE_NUMBER, {
    variables: {
      departementId: filters.departement ? parseInt(filters.departement.value) : undefined,
      end: filters.endDate,
      regionId: filters.region ? parseInt(filters.region.value) : undefined,
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
      indicator={closed_mesures_nb ? closed_mesures_nb : 0}
    />
  );
};

export { ClosedMesureIndicator };
