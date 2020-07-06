import { gql } from "apollo-boost";
import { useContext } from "react";
import { useQuery } from "react-apollo";

import { UserContext } from "../../components/UserContext";

const GET_DEPARTEMENTS = gql`
  query departements($filterIds: [Int!]) {
    departements(order_by: { nom: asc }, where: { id: { _in: $filterIds } }) {
      id
      code
      nom
    }
  }
`;

export const GET_DIRECTION_REGION_DEPARTEMENT = gql`
  query direction_region_departement($userId: Int!) {
    direction(where: { user_id: { _eq: $userId } }) {
      region {
        nom
        departements {
          code
          nom
          id
        }
      }
      departement {
        code
      }
    }
  }
`;

export function useDepartements() {
  const user = useContext(UserContext);

  const { data } = useQuery(GET_DIRECTION_REGION_DEPARTEMENT, {
    skip: user.type !== "direction",
    variables: {
      userId: user.id,
    },
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

  const { data: departementsData, loading, error } = useQuery(GET_DEPARTEMENTS, {
    variables: {
      filterIds: departementsIds,
    },
  });

  return {
    departements: departementsData ? departementsData.departements : [],
    error,
    loading,
  };
}
