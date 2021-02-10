import { gql } from "apollo-boost";
import { useContext } from "react";
import { useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

const GET_FILTERED_DEPARTEMENTS = gql`
  query filtered_departements($filterCodes: [String!]) {
    departements(order_by: { nom: asc }, where: { id: { _in: $filterCodes } }) {
      id
      nom
    }
  }
`;

const GET_DEPARTEMENTS = gql`
  query departements {
    departements(order_by: { nom: asc }) {
      id
      nom
    }
  }
`;

const GET_DIRECTION_REGION_DEPARTEMENT = gql`
  query direction_region_departement($userId: Int!) {
    direction(where: { user_id: { _eq: $userId } }) {
      id
      region {
        id
        nom
        departements {
          id
          nom
        }
      }
      departement {
        id
        nom
      }
    }
  }
`;

export function useDepartements({ all = false, ...queryOptions } = {}) {
  const user = useUser();

  const { data } = useQuery(GET_DIRECTION_REGION_DEPARTEMENT, {
    skip: all || user?.type !== "direction",
    variables: {
      userId: user.id,
    },
    ...queryOptions,
  });

  let departementsCodes = null;
  if (data && data.direction) {
    const [direction] = data.direction;
    const { departement, region } = direction;

    if (region && region.departements) {
      const { departements } = region;
      departementsCodes = departements.map(({ id }) => id);
    } else if (departement) {
      departementsCodes = [departement.id];
    }
  }

  const { data: departementsData, loading, error } = useQuery(
    departementsCodes === null ? GET_DEPARTEMENTS : GET_FILTERED_DEPARTEMENTS,
    {
      variables:
        departementsCodes === null
          ? {}
          : {
              filterCodes: departementsCodes,
            },
    }
  );

  return {
    departements: departementsData ? departementsData.departements : [],
    error,
    loading,
  };
}
