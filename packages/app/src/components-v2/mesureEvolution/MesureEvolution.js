import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4 } from "@socialgouv/emjpm-ui-core";
import { FiltersContext } from "../filters/context";
import { GET_CATEGORY_EVOLUTION } from "../../graphql/Queries";
import { MesureEvolutionChart } from "./MesureEvolutionChart";

export const MesureEvolution = () => {
  // eslint-disable-next-line no-unused-vars
  const { selectedRegionalValue, selectedDepartementValue, selectedTribunalValue } = useContext(
    FiltersContext
  );

  const { data, error, loading } = useQuery(GET_CATEGORY_EVOLUTION, {
    variables: {
      start: "2017-01-01",
      end: "2019-12-31",
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined
      // region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
      // court: selectedTribunalValue ? parseInt(selectedTribunalValue.value) : undefined
    }
  });

  if (loading) {
    return (
      <Card flexBasis="100%">
        <Heading2>Répartition des mesures à date</Heading2>
        <Heading4>chargement</Heading4>
        {/* <Spinner variant="bgDark" /> */}
      </Card>
    );
  }

  if (error) {
    return (
      <Card flexBasis="100%">
        <Heading2>Répartition des mesures à date</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  console.log(data);

  return (
    <Card flexBasis="100%">
      <Heading2>Évolution du nombre de mesures</Heading2>
      <MesureEvolutionChart data={data} />
    </Card>
  );
};
