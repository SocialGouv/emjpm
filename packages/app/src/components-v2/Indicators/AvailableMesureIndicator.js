import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { Indicator } from "@socialgouv/emjpm-ui-components";

import { GET_AVAILABLE_MESURE_NUMBER } from "./queries";
import { FiltersContext } from "../Filters/context";

const AvailableMesureIndicator = () => {
  const {
    selectedRegionalValue,
    selectedDepartementValue,
    startDateValue,
    endDateValue
  } = useContext(FiltersContext);

  const { error, data, loading } = useQuery(GET_AVAILABLE_MESURE_NUMBER, {
    variables: {
      start: startDateValue,
      end: endDateValue,
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mesures disponibles"
      indicator={data.availableMesureNumber}
    />
  );
};

export { AvailableMesureIndicator };
