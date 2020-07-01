import { gql } from "apollo-boost";
import { useMemo } from "react";
import { useQuery } from "react-apollo";

const GET_DEPARTEMENTS = gql`
  {
    departements(order_by: { nom: asc }) {
      id
      code
      nom
    }
  }
`;

export function useDepartements() {
  const { data: departementsData, loading, error } = useQuery(GET_DEPARTEMENTS);

  const departements = useMemo(() => {
    if (departementsData) {
      return departementsData.departements;
    }
    return [];
  }, [departementsData]);

  return {
    departements,
    error,
    loading,
  };
}
