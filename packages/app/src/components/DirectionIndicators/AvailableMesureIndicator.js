import { useQuery } from "@apollo/client";
import { useContext } from "react";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import { Indicator } from "~/ui";

import { GET_AVAILABLE_MESURE_NUMBER } from "./queries";

function AvailableMesureIndicator() {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_AVAILABLE_MESURE_NUMBER, {
    variables: {
      departementId: filters.departement
        ? parseInt(filters.departement)
        : undefined,
      regionId: filters.region ? parseInt(filters.region) : undefined,
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
      indicator={available_mesures_nb ? Number(available_mesures_nb) : 0}
    />
  );
}

export { AvailableMesureIndicator };
