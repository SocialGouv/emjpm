import gql from "graphql-tag";

export const GET_DEPARTEMENTS = gql`
  {
    departements(order_by: { nom: asc }) {
      id
      nom
    }
  }
`;
