import { Button } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { ApolloConsumer } from "react-apollo";

import { FiltersContext } from "../DirectionFilters/context";
import { exportMandataires } from "./MandatairesExcel";
import { MANDATAIRES } from "./queries";

const fetchMandatairesData = async (client, regionalValue, departementalValue) => {
  const queryResult = await client.query({
    query: MANDATAIRES,
    variables: {
      department: departementalValue ? parseInt(departementalValue.value) : undefined,
      region: regionalValue ? parseInt(regionalValue.value) : undefined
    }
  });
  return queryResult.data;
};

const doExport = async (client, regionalValue, departementalValue) => {
  const all = await fetchMandatairesData(client, regionalValue, departementalValue);
  const users = all.mandataires;
  const services = all.services;
  exportMandataires(users, services, regionalValue, departementalValue);
};

const MandatairesExport = () => {
  const { selectedRegionalValue, selectedDepartementValue } = useContext(FiltersContext);

  const exportFile = (client, regionalValue, departementalValue) => {
    doExport(client, regionalValue, departementalValue);
  };

  return (
    <ApolloConsumer>
      {client => (
        <Button
          mr={0}
          onClick={() => exportFile(client, selectedRegionalValue, selectedDepartementValue)}
        >
          Exporter toutes les données
        </Button>
      )}
    </ApolloConsumer>
  );
};

export { MandatairesExport };
