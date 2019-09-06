import { Button } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { ApolloConsumer } from "react-apollo";
import { FiltersContext } from "../Filters/context";
import { exportMandataires } from "./MandatairesExcel";
import { MANDATAIRES, SERVICES } from "./queries";

const fetchMandatairesData = async client => {
  const queryResult = await client.query({
    query: MANDATAIRES
  });
  return queryResult.data.users;
};

const fetchServicesData = async client => {
  const queryResult = await client.query({
    query: SERVICES
  });
  return queryResult.data.services;
};

const doExport = async (client, regionalValue, departementalValue) => {
  const users = await fetchMandatairesData(client);
  const services = await fetchServicesData(client);
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
        <Button onClick={() => exportFile(client, selectedRegionalValue, selectedDepartementValue)}>
          Exporter toutes les données
        </Button>
      )}
    </ApolloConsumer>
  );
};

export { MandatairesExport };
