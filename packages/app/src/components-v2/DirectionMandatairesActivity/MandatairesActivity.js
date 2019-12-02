import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box } from "rebass";

import { convertToPercentage } from "../../util/math";
import { FiltersContext } from "../DirectionFilters/context";
import { MandatairesActivityChart } from "./MandatairesActivityChart";
import { MANDATAIRE_ACTIVITY } from "./queries";

const MandatairesActivity = props => {
  const { selectedRegionalValue, selectedDepartementValue } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(MANDATAIRE_ACTIVITY, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return (
      <Card p="4">
        <Heading2>Répartition de l’activité par type de mandataires</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="4">
        <Heading2>Répartition de l’activité par type de mandataires</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const service = data.service.aggregate.sum.mesures_in_progress;
  const mandataireIndividuel = data.mandataireIndividuel.aggregate.sum.mesures_in_progress;
  const mandatairePrepose = data.mandatairePrepose.aggregate.sum.mesures_in_progress;
  const total = service + mandataireIndividuel + mandatairePrepose;

  const activityChartData = {
    mandataireIndividuel: {
      percentage: convertToPercentage(mandataireIndividuel, total),
      sum: mandataireIndividuel
    },
    mandatairePrepose: {
      percentage: convertToPercentage(mandatairePrepose, total),
      sum: mandatairePrepose
    },
    service: {
      percentage: convertToPercentage(service, total),
      sum: service
    },
    total
  };

  return (
    <Card p="4" {...props}>
      <Heading2>Répartition de l’activité par type de mandataires</Heading2>
      <MandatairesActivityChart data={activityChartData} />
    </Card>
  );
};

export { MandatairesActivity };
