import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@emjpm/ui";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_NEW_MESURE_NUMBER } from "./queries";

const NewMesureIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_NEW_MESURE_NUMBER, {
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
      title="Mesures en attente"
      indicator={data && data.newMesureNumber ? data.newMesureNumber : 0}
    />
  );
};

export { NewMesureIndicator };
