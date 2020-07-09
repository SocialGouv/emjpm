import gql from "graphql-tag";

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

export const GET_DEPARTEMENTS = gql`
  query departements($filterIds: [Int!] = []) {
    departements(order_by: { nom: asc }, where: { id: { _in: $filterIds } }) {
      id
      nom
    }
  }
`;
