import { useQuery } from "@apollo/client";
import { useContext } from "react";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Indicator } from "~/components";

import { GET_GESTIONNAIRE_NUMBER } from "./queries";

function MandatairesIndicator() {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      department: filters.departement ? filters.departement : undefined,
      region: filters.region ? parseInt(filters.region) : undefined,
      type: "MANDATAIRE_IND",
    },
  });

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Mandataires individuels"
      indicator={
        data && data.gestionnaireNumber
          ? Number(data.gestionnaireNumber.aggregate.count)
          : 0
      }
    />
  );
}

export { MandatairesIndicator };
