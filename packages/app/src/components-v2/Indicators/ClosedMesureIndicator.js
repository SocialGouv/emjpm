import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import React, { useContext } from "react";
import { FiltersContext } from "../Filters/context";
import { GET_CLOSED_MESURE_NUMBER } from "./queries";

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
      indicator={data && data.closedMesureNumber ? data.closedMesureNumber : 0}
    />
  );
};

export { ClosedMesureIndicator };
