import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@emjpm/ui";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_AVAILABLE_MESURE_NUMBER } from "./queries";

const AvailableMesureIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_AVAILABLE_MESURE_NUMBER, {
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
      title="Disponibilités"
      indicator={data && data.availableMesureNumber ? data.availableMesureNumber : 0}
    />
  );
};

export { AvailableMesureIndicator };
