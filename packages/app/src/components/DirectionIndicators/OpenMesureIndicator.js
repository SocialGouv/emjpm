import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@emjpm/ui";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_OPEN_MESURE_NUMBER } from "./queries";

const OpenMesureIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_OPEN_MESURE_NUMBER, {
    variables: {
      departementId: filters.departement
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
    stat_opened_mesures: { opened_mesures_nb },
  } = data;

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mesures en cours"
      indicator={opened_mesures_nb ? opened_mesures_nb : 0}
    />
  );
};

export { OpenMesureIndicator };
