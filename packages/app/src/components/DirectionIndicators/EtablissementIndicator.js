import { useQuery } from "@apollo/client";
import { useContext } from "react";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import { Indicator } from "~/ui";

import { GET_GESTIONNAIRE_NUMBER } from "./queries";

function EtablissementIndicator() {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      department: filters.departement
        ? parseInt(filters.departement)
        : undefined,
      region: filters.region ? parseInt(filters.region) : undefined,
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
}

export { EtablissementIndicator };
