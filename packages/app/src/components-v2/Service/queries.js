import gql from "graphql-tag";

export const allMesures = gql`
  {
    mesures(order_by: { created_at: asc }, limit: 10) {
      id
      ville
    }
  }
`;
