import { Button } from "@emjpm/ui";
import React, { useContext } from "react";
import { ApolloConsumer } from "react-apollo";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { exportMandataires } from "./MandatairesExcel";
import { MANDATAIRES } from "./queries";

const fetchMandatairesData = async (client, region, departement) => {
  const queryResult = await client.query({
    query: MANDATAIRES,
    variables: {
      department: departement ? parseInt(departement.value) : undefined,
      region: region ? parseInt(region.value) : undefined,
    },
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
  const { filters } = useContext(FiltersContextSerializable);
  return (
    <ApolloConsumer>
      {(client) => (
        <Button mr={0} onClick={() => doExport(client, filters.region, filters.departement)}>
          Exporter toutes les données
        </Button>
      )}
    </ApolloConsumer>
  );
};

export { MandatairesExport };
