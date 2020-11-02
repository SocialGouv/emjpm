import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@emjpm/ui";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_AVAILABLE_MESURE_NUMBER } from "./queries";

const AvailableMesureIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_AVAILABLE_MESURE_NUMBER, {
    variables: {
      departementId: filters.departement
        ? parseInt(filters.departement.value)
        : undefined,
      regionId: filters.region ? parseInt(filters.region.value) : undefined,
    },
  });

  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }

  const {
    stat_available_mesures: { available_mesures_nb },
  } = data;

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Disponibilités"
      indicator={available_mesures_nb ? available_mesures_nb : 0}
    />
  );
};

export { AvailableMesureIndicator };
