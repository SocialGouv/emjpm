import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import React, { useContext } from "react";
import { FiltersContext } from "../Filters/context";
import { GET_GESTIONNAIRE_NUMBER } from "./queries";

const MandatairesIndicator = () => {
  const { selectedRegionalValue, selectedDepartementValue } = useContext(FiltersContext);

  // Replace me with the real query
  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      type: "MANDATAIRE_IND",
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mandataires individuels"
      indicator={data.gestionnaireNumber.aggregate.count}
    />
  );
};

export { MandatairesIndicator };
