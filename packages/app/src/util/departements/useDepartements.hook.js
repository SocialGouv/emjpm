import { gql } from "apollo-boost";
import { useContext } from "react";
import { useQuery } from "react-apollo";

import { UserContext } from "~/components/UserContext";

const GET_FILTERED_DEPARTEMENTS = gql`
  query filtered_departements($filterIds: [Int!]) {
    departements(order_by: { nom: asc }, where: { id: { _in: $filterIds } }) {
      id
      code
      nom
    }
  }
`;

const GET_DEPARTEMENTS = gql`
  query departements {
    departements(order_by: { nom: asc }) {
      id
      code
      nom
    }
  }
`;

export const GET_DIRECTION_REGION_DEPARTEMENT = gql`
  query direction_region_departement($userId: Int!) {
    direction(where: { user_id: { _eq: $userId } }) {
      id
      region {
        id
        nom
        departements {
          code
          nom
          id
        }
      }
      departement {
        id
        code
        nom
      }
    }
  }
`;

export function useDepartements({ all = false, ...queryOptions } = {}) {
  const user = useContext(UserContext);

  const { data } = useQuery(GET_DIRECTION_REGION_DEPARTEMENT, {
    skip: all || user?.type !== "direction",
    variables: {
      userId: user.id,
    },
    ...queryOptions,
  });

  let departementsIds = null;
  if (data && data.direction) {
    const [direction] = data.direction;
    const { departement, region } = direction;

    if (region && region.departements) {
      const { departements } = region;
      departementsIds = departements.map(({ id }) => id);
    } else if (departement) {
      departementsIds = [departement.id];
    }
  }

  const { data: departementsData, loading, error } = useQuery(
    departementsIds === null ? GET_DEPARTEMENTS : GET_FILTERED_DEPARTEMENTS,
    {
      variables:
        departementsIds === null
          ? {}
          : {
              filterIds: departementsIds,
            },
    }
  );

  return {
    departements: departementsData ? departementsData.departements : [],
    error,
    loading,
  };
}
