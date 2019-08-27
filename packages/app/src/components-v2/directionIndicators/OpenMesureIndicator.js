import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { GET_OPEN_MESURE_NUMBER } from "../../graphql/Queries";
import { FiltersContext } from "../filters/context";
import { Indicator } from "@socialgouv/emjpm-ui-components";

const OpenMesureIndicator = () => {
  const {
    selectedRegionalValue,
    selectedDepartementValue,
    startDateValue,
    endDateValue
  } = useContext(FiltersContext);

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
      title="Mesures en cours"
      indicator={data.openMesureNumber}
    />
  );
};

export { OpenMesureIndicator };
