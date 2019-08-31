import React, { useContext } from "react";

import { useQuery } from "@apollo/react-hooks";

import { FiltersContext } from "../Filters/context";
import { Indicator } from "@socialgouv/emjpm-ui-components";
// Replace me with the real query
import { GET_OPEN_MESURE_NUMBER } from "./queries";

const ServicesIndicator = () => {
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
      title="Services mandataires"
      indicator={data.openMesureNumber}
    />
  );
};

export { ServicesIndicator };
