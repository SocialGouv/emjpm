import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import React, { useContext } from "react";

import { FiltersContext } from "../DirectionFilters/context";
import { GET_NEW_MESURE_NUMBER } from "./queries";

const NewMesureIndicator = () => {
  const {
    selectedRegionalValue,
    selectedDepartementValue,
    startDateValue,
    endDateValue
  } = useContext(FiltersContext);

  const { error, data, loading } = useQuery(GET_NEW_MESURE_NUMBER, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      end: endDateValue,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined,
      start: startDateValue
    }
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
