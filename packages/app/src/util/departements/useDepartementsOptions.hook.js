import { useMemo } from "react";

import { DepartementFormUtil } from "./DepartementFormUtil";
import { useDepartements } from "./useDepartements.hook";

export function useDepartementsOptions(config) {
  const { departements, loading, error } = useDepartements();

  const departementsOptions = useMemo(() => {
    if (departements) {
      return DepartementFormUtil.departementToOptions(departements, config);
    }
    return [];
  }, [departements, config]);

  return {
    departementsOptions,
    error,
    loading,
  };
}
