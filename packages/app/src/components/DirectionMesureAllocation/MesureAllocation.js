import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box } from "rebass";

import { getMesureCategoryNatureLabel } from "../../util/mesures";
import { FiltersContext } from "../DirectionFilters/context";
import { MesureAllocationChart } from "./MesureAllocationChart";
import { GET_CATEGORY_STATS } from "./queries";

export const MesureAllocation = () => {
  const {
    selectedRegionalValue,
    startDateValue,
    selectedDepartementValue,
    endDateValue,
  } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(GET_CATEGORY_STATS, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      end: endDateValue,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined,
      start: startDateValue,
    },
  });

  if (loading) {
    return (
      <Card>
        <Heading2>Répartition des mesures à date</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Heading2>Répartition des mesures à date</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const mesures = data.mesureNatureCategoryStatistics.map((mesure) => {
    return {
      name: getMesureCategoryNatureLabel(mesure.mesureNatureCategory),
      "nombre de mesures": mesure.number,
      nature: mesure.mesureNatureCategory,
    };
  });

  return <MesureAllocationChart mesures={mesures} />;
};
