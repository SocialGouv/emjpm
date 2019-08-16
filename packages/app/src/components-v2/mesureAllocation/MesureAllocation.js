import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4 } from "@socialgouv/emjpm-ui-core";
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
  const { selectedRegionalValue, selectedDepartementValue, selectedTribunalValue } = useContext(
    FiltersContext
  );

  const { data, error, loading } = useQuery(GET_CATEGORY_STATS, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined
      // region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
      // court: selectedTribunalValue ? parseInt(selectedTribunalValue.value) : undefined
    }
  });

  if (loading) {
    return (
      <Card flexBasis="49.5%">
        <Heading2>Répartition des mesures à date</Heading2>
        <Heading4>chargement</Heading4>
        {/* <Spinner variant="bgDark" /> */}
      </Card>
    );
  }

  if (error) {
    return (
      <Card flexBasis="49.5%">
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
