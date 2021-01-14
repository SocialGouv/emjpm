import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function useUrlQueryValues(params) {
  const routeParams = useParams();

  return useMemo(() => {
    Object.assign(params, routeParams);
    return params;
  }, [params, routeParams]);
}
