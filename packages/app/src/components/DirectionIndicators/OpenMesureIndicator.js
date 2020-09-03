import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@emjpm/ui";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_OPEN_MESURE_NUMBER } from "./queries";

const OpenMesureIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_OPEN_MESURE_NUMBER, {
    variables: {
      department: filters.departement ? parseInt(filters.departement.value) : undefined,
      end: filters.endDate,
      region: filters.region ? parseInt(filters.region.value) : undefined,
      start: filters.startDate,
    },
  });

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mesures en cours"
      indicator={data && data.openMesureNumber ? data.openMesureNumber : 0}
    />
  );
};

export { OpenMesureIndicator };
