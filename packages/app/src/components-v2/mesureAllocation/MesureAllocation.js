import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import { Box } from "rebass";
import { MesureAllocationChart } from "./MesureAllocationChart";
import { FiltersContext } from "../filters/context";
import { GET_CATEGORY_STATS } from "../../graphql/Queries";

const type = {
  TUTELLE: "Tutelle",
  CURATELLE_SIMPLE: "Curatelle simple",
  CURATELLE_RENFORCEE: "Curatelle renforcee",
  SAUVEGARDE_JUSTICE: "Sauvegarde de justice",
  OTHER: "Autre"
};

export const MesureAllocation = () => {
  // eslint-disable-next-line no-unused-vars
  const {
    selectedRegionalValue,
    startDateValue,
    selectedDepartementValue,
    endDateValue
  } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(GET_CATEGORY_STATS, {
    variables: {
      start: startDateValue,
      end: endDateValue,
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return (
      <Card flexBasis="49%">
        <Heading2>Répartition des mesures à date</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card flexBasis="49%">
        <Heading2>Répartition des mesures à date</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const mesures = data.mesureTypeCategoryStatistics.map(mesure => {
    return {
      name: type[mesure.mesureTypeCategory],
      "nombre de mesures": mesure.number
    };
  });

  return <MesureAllocationChart mesures={mesures} />;
};
