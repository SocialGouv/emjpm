import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Box } from "rebass";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Card, Heading, Spinner } from "~/components";
import useQueryReady from "~/hooks/useQueryReady";

import { MandatairesDisponibilityChart } from "./MandatairesDisponibilityChart";
import { MANDATAIRE_ACTIVITY } from "./queries";

function MandatairesDisponibility(props) {
  const { filters } = useContext(FiltersContextSerializable);
  const { data, error, loading } = useQuery(MANDATAIRE_ACTIVITY, {
    variables: {
      department: filters.departement ? filters.departement : undefined,
      region: filters.region ? parseInt(filters.region) : undefined,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
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
