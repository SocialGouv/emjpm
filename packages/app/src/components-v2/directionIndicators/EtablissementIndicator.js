import React, { useContext } from "react";

import { useQuery } from "@apollo/react-hooks";

import { FiltersContext } from "../filters/context";
import { Indicator } from "./Indicator";
// Replace me with the real query
import { GET_OPEN_MESURE_NUMBER } from "../../graphql/Queries";

const EtablissementIndicator = () => {
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
      title="Préposés d'établissement"
      indicator={data.openMesureNumber}
    />
  );
};

export { EtablissementIndicator };
