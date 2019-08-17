import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { GET_AVAILABLE_MESURE_NUMBER } from "../../graphql/Queries";
import { FiltersContext } from "../filters/context";
import { DirectionIndicator } from "./DirectionIndicator";

const AvailableMesureIndicator = () => {
  // eslint-disable-next-line no-unused-vars
  const { selectedRegionalValue, selectedDepartementValue, selectedTribunalValue } = useContext(
    FiltersContext
  );

  console.log(selectedDepartementValue);

  const { data, loading } = useQuery(GET_AVAILABLE_MESURE_NUMBER, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return <DirectionIndicator title="Mesures disponibles" indicator={data.availableMesureNumber} />;
};

export { AvailableMesureIndicator };
