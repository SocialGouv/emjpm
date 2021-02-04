import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Box } from "rebass";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Card, Heading, Spinner } from "~/components";
import { convertToPercentage } from "~/utils/math";

import { MandatairesActivityChart } from "./MandatairesActivityChart";
import { MANDATAIRE_ACTIVITY } from "./queries";

function MandatairesActivity(props) {
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
        <Heading size={2}>
          Répartition de l’activité par type de mandataires
        </Heading>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="4">
        <Heading size={2}>
          Répartition de l’activité par type de mandataires
        </Heading>
        <Heading size={4}>erreur</Heading>
      </Card>
    );
  }

  const service = data.service.aggregate.sum.mesures_in_progress;
  const mandataireIndividuel =
    data.mandataireIndividuel.aggregate.sum.mesures_in_progress;
  const mandatairePrepose =
    data.mandatairePrepose.aggregate.sum.mesures_in_progress;
  const total = service + mandataireIndividuel + mandatairePrepose;

  const activityChartData = {
    mandataireIndividuel: {
      percentage: convertToPercentage(mandataireIndividuel, total),
      sum: mandataireIndividuel,
    },
    mandatairePrepose: {
      percentage: convertToPercentage(mandatairePrepose, total),
      sum: mandatairePrepose,
    },
    service: {
      percentage: convertToPercentage(service, total),
      sum: service,
    },
    total,
  };

  return (
    <Card p="4" {...props}>
      <Heading size={2}>
        Répartition de l’activité par type de mandataires
      </Heading>
      <MandatairesActivityChart data={activityChartData} />
    </Card>
  );
}

export { MandatairesActivity };
