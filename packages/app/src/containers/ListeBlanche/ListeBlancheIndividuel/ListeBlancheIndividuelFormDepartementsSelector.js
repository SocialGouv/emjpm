import { findDepartementByCodeOrId } from "@emjpm/biz";

import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { Select } from "~/components";
import { useDepartements } from "~/utils/departements/useDepartements.hook";

export function ListeBlancheIndividuelFormDepartementsSelector(props) {
  const { departements = [], onAdd } = props;
  const queryResults = useDepartements();
  const { loading, error } = queryResults;

  if (!useQueryReady(loading, error)) {
    return null;
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
}

export default ListeBlancheIndividuelFormDepartementsSelector;
