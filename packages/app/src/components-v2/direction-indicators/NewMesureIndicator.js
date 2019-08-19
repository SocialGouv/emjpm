import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { GET_NEW_MESURE_NUMBER } from "../../graphql/Queries";
import { FiltersContext } from "../filters/context";
import { DirectionIndicator } from "./DirectionIndicator";

const NewMesureIndicator = () => {
  // eslint-disable-next-line no-unused-vars
  const {
    selectedRegionalValue,
    selectedDepartementValue,
    startDateValue,
    endDateValue
  } = useContext(FiltersContext);

  const { error, data, loading } = useQuery(GET_NEW_MESURE_NUMBER, {
    variables: {
      start: startDateValue,
      end: endDateValue,
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (error) {
    return <div>loading...</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return <DirectionIndicator title="Nouvelles mesures" indicator={data.newMesureNumber} />;
};

export { NewMesureIndicator };
