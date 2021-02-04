import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Box } from "rebass";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import { Card, Heading, Spinner } from "~/ui";

import { MandatairesDisponibilityChart } from "./MandatairesDisponibilityChart";
import { MANDATAIRE_ACTIVITY } from "./queries";

function MandatairesDisponibility(props) {
  const { filters } = useContext(FiltersContextSerializable);
  const { data, error, loading } = useQuery(MANDATAIRE_ACTIVITY, {
    variables: {
      department: filters.departement
        ? parseInt(filters.departement)
        : undefined,
      region: filters.region ? parseInt(filters.region) : undefined,
    },
  });

  if (loading) {
    return (
      <Card p="4">
        <Heading size={2}>Disponibilités par type de mandataires</Heading>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="4">
        <Heading size={2}>Disponibilités par type de mandataires</Heading>
        <Heading size={4}>erreur</Heading>
      </Card>
    );
  }

  const remainingCapacity = (data) =>
    data.mesures_max - data.mesures_awaiting - data.mesures_in_progress;

  const overcapacity = (data) => remainingCapacity(data) < 0;

  const getCapacity = (data) => ({
    "Disponibilité actuelle": remainingCapacity(data),
    "Disponibilité max": data.mesures_max,
    overcapacity: overcapacity(data),
  });

  const activityChartData = [
    {
      name: "SERVICES MANDATAIRES",
      ...getCapacity(data.service.aggregate.sum),
    },
    {
      name: "MANDATAIRES INDIVIDUELS",
      ...getCapacity(data.mandataireIndividuel.aggregate.sum),
    },
    {
      name: "PRÉPOSÉS D’ÉTABLISSEMENTS",
      ...getCapacity(data.mandatairePrepose.aggregate.sum),
    },
  ];

  return (
    <Card p="4" {...props}>
      <Heading size={2}>Disponibilités par type de mandataires</Heading>
      <MandatairesDisponibilityChart data={activityChartData} />
    </Card>
  );
}
export { MandatairesDisponibility };
