import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box } from "rebass";

import { FiltersContext } from "../DirectionFilters/context";
import { MandatairesDisponibilityChart } from "./MandatairesDisponibilityChart";
import { MANDATAIRE_ACTIVITY } from "./queries";

const MandatairesDisponibility = props => {
  const { selectedDepartementValue, selectedRegionalValue } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(MANDATAIRE_ACTIVITY, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return (
      <Card p="4">
        <Heading2>Disponibilités par type de mandataires</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="4">
        <Heading2>Disponibilités par type de mandataires</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const remainingCapacity = data =>
    data.mesures_max - data.mesures_awaiting - data.mesures_in_progress;

  const overcapacity = data => remainingCapacity(data) < 0;

  const getCapacity = data => ({
    "Disponibilité actuelle": remainingCapacity(data),
    "Disponibilité max": data.mesures_max,
    overcapacity: overcapacity(data)
  });

  const activityChartData = [
    {
      name: "SERVICES MANDATAIRES",
      ...getCapacity(data.service.aggregate.sum)
    },
    {
      name: "MANDATAIRES INDIVIDUELS",
      ...getCapacity(data.mandataireIndividuel.aggregate.sum)
    },
    {
      name: "PRÉPOSÉS D’ÉTABLISSEMENTS",
      ...getCapacity(data.mandatairePrepose.aggregate.sum)
    }
  ];

  return (
    <Card p="4" {...props}>
      <Heading2>Disponibilités par type de mandataires</Heading2>
      <MandatairesDisponibilityChart data={activityChartData} />
    </Card>
  );
};
export { MandatairesDisponibility };
