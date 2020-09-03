import gql from "graphql-tag";

export const GET_DEPARTEMENTS = gql`
  query departements {
    departements(order_by: { nom: asc }) {
      id
      nom
    }
  }
`;
