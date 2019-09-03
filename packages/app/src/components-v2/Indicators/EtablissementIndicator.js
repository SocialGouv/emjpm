import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import React, { useContext } from "react";
import { FiltersContext } from "../Filters/context";
import { GET_GESTIONNAIRE_NUMBER } from "./queries";

const EtablissementIndicator = () => {
  const { selectedRegionalValue, selectedDepartementValue } = useContext(FiltersContext);

  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      type: "MANDATAIRE_PRE",
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
      title="Préposés d'établissement"
      indicator={data.view_mesure_gestionnaire_aggregate.aggregate.count}
    />
  );
};

export { EtablissementIndicator };
