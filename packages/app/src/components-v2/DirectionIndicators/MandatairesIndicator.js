import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import React, { useContext } from "react";

import { FiltersContext } from "../DirectionFilters/context";
import { GET_GESTIONNAIRE_NUMBER } from "./queries";

const MandatairesIndicator = () => {
  const { selectedRegionalValue, selectedDepartementValue } = useContext(FiltersContext);

  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined,
      type: "MANDATAIRE_IND"
    }
  });

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mandataires individuels"
      indicator={data && data.gestionnaireNumber ? data.gestionnaireNumber.aggregate.count : 0}
    />
  );
};

export { MandatairesIndicator };
