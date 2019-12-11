import gql from "graphql-tag";

export const GET_REGIONS = gql`
  {
    regions(order_by: { nom: asc }) {
      id
      nom
      departements(order_by: { nom: asc }) {
        id
        nom
      }
    }
  }
`;
