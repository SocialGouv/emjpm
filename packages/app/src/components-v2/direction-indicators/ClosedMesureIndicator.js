import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { GET_CLOSED_MESURE_NUMBER } from "../../graphql/Queries";
import { FiltersContext } from "../filters/context";
import { DirectionIndicator } from "./DirectionIndicator";

const ClosedMesureIndicator = () => {
  // eslint-disable-next-line no-unused-vars
  const { selectedRegionalValue, selectedDepartementValue, selectedTribunalValue } = useContext(
    FiltersContext
  );

  const { data, loading } = useQuery(GET_CLOSED_MESURE_NUMBER, {
    variables: {
      start: "2017-01-01",
      end: "2019-12-31",
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return <DirectionIndicator title="Mesures éteintes" indicator={data.closedMesureNumber} />;
};

export { ClosedMesureIndicator };
