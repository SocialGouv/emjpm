import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";

import { FiltersContext } from "../Filters/context";
// Replace me with the real query
import { GET_OPEN_MESURE_NUMBER } from "./queries";

const MandatairesIndicator = () => {
  const {
    selectedRegionalValue,
    selectedDepartementValue,
    startDateValue,
    endDateValue
  } = useContext(FiltersContext);

  // Replace me with the real query
  const { error, data, loading } = useQuery(GET_OPEN_MESURE_NUMBER, {
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
      title="Mandataires individuels"
      indicator={data.openMesureNumber}
    />
  );
};

export { MandatairesIndicator };
