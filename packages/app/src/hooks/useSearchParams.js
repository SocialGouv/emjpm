import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function useSearchParams() {
  const { search } = useLocation();
  return useMemo(() => {
    return queryString.parse(search);
  }, [search]);
}
