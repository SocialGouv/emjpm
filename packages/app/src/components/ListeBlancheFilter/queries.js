import gql from "graphql-tag";

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
      }
    }
  }
`;

export const GET_DEPARTEMENTS = gql`
  query departements {
    departements(order_by: { nom: asc }) {
      id
      nom
    }
  }
`;
