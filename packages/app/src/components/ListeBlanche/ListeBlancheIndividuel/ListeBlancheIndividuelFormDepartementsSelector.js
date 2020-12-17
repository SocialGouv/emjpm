import { findDepartementByCodeOrId } from "@emjpm/core";
import { Select } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import { useDepartements } from "~/util/departements/useDepartements.hook";

export const ListeBlancheIndividuelFormDepartementsSelector = (props) => {
  const { departements = [], onAdd } = props;
  const queryResults = useDepartements();

  if (queryResults.DepartementFormUtilloading) {
    return <Box>Chargement...</Box>;
  }

  const options = !queryResults.departements
    ? []
    : queryResults.departements
        .filter((item) => {
          return !departements.map((d) => d.id).includes(item.id);
        })
        .map((item) => {
          return {
            label: item.nom,
            value: item.id,
          };
        });

  return (
    <Select
      instanceId={"add-department"}
      placeholder={"Ajouter un département"}
      size="small"
      sx={{ width: "100%" }}
      options={options}
      value={null}
      onChange={(option) => {
        const departement = findDepartementByCodeOrId(
          queryResults.departements,
          {
            id: option.value,
          }
        );
        onAdd(departement);
      }}
    />
  );
};

export default ListeBlancheIndividuelFormDepartementsSelector;
