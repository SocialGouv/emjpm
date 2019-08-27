import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { GET_CLOSED_MESURE_NUMBER } from "../../graphql/Queries";
import { FiltersContext } from "../filters/context";
import { Indicator } from "@socialgouv/emjpm-ui-components";

const ClosedMesureIndicator = () => {
  const {
    selectedRegionalValue,
    selectedDepartementValue,
    startDateValue,
    endDateValue
  } = useContext(FiltersContext);

  const { error, data, loading } = useQuery(GET_CLOSED_MESURE_NUMBER, {
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
      title="Mesures éteintes"
      indicator={data.closedMesureNumber}
    />
  );
};

export { ClosedMesureIndicator };
