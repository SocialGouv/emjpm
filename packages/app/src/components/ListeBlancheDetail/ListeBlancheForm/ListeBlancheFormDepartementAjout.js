import { Select } from "@emjpm/ui";
import React, { useMemo, useState } from "react";

import { DepartementFormUtil } from "../../../util/departements";
import { useDepartements } from "../../../util/departements/useDepartements.hook";
import { LoadingWrapper } from "../../Commons";

const departementsOptionsConfig = {
  nullOption: {
    label: "Ajouter un département",
  },
};
export const ListeBlancheFormDepartementAjout = ({
  lb_user,
  lbDepartements,
  setLbDepartements,
}) => {
  const { departements, loading, error } = useDepartements();

  const options = useOptions(lbDepartements, departements);

  const [selectedOption, setSelectedOption] = useState();

  function addDepartement(option) {
    if (option && option.departement) {
      const departementItem = {
        id: undefined,
        label: DepartementFormUtil.formatDepartementLabel(option.departement),
        departement: option.departement,
        departement_financeur: false,
        individuel: lb_user.type === "individuel",
        service: lb_user.type === "service",
        prepose: lb_user.type === "prepose",
        ti: lb_user.type === "ti",
      };
      setSelectedOption(options[0]); // reset select
      setLbDepartements(lbDepartements.concat(departementItem));
    }
  }

  return (
    <LoadingWrapper error={error} loading={loading}>
      <Select
        placeholder={"Ajouter un département"}
        size="small"
        sx={{ width: "100%" }}
        options={options}
        value={selectedOption}
        onChange={(option) => addDepartement(option)}
      />
    </LoadingWrapper>
  );
};
function useOptions(lbDepartements, departements) {
  const departementsToAdd = useMemo(() => {
    const selectedCodes = lbDepartements.map((lbDepartement) => lbDepartement.departement.code);
    return departements.filter((departement) => !selectedCodes.includes(departement.code));
  }, [departements, lbDepartements]);

  const options = useMemo(() => {
    if (departementsToAdd) {
      return DepartementFormUtil.departementToOptions(departementsToAdd, departementsOptionsConfig);
    }
    return [];
  }, [departementsToAdd]);
  return options;
}
