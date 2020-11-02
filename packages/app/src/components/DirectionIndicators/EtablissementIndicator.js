import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@emjpm/ui";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_GESTIONNAIRE_NUMBER } from "./queries";

const EtablissementIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      department: filters.departement
        ? parseInt(filters.departement.value)
        : undefined,
      region: filters.region ? parseInt(filters.region.value) : undefined,
      type: "MANDATAIRE_PRE",
    },
  });

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Préposés d'établissement"
      indicator={
        data && data.gestionnaireNumber
          ? data.gestionnaireNumber.aggregate.count
          : 0
      }
    />
  );
};

export { EtablissementIndicator };
