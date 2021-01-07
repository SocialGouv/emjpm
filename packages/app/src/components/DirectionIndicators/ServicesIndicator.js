import { useQuery } from "@apollo/client";
import React, { useContext } from "react";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import { Indicator } from "~/ui";

import { GET_GESTIONNAIRE_NUMBER } from "./queries";

const ServicesIndicator = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { error, data, loading } = useQuery(GET_GESTIONNAIRE_NUMBER, {
    variables: {
      department: filters.departement
        ? parseInt(filters.departement)
        : undefined,
      region: filters.region ? parseInt(filters.region) : undefined,
      type: "SERVICE",
    },
  });

  return (
    <Indicator
      error={error}
      loading={loading}
      title="Services mandataires"
      indicator={
        data && data.gestionnaireNumber
          ? data.gestionnaireNumber.aggregate.count
          : 0
      }
    />
  );
};

export { ServicesIndicator };
