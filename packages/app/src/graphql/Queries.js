import gql from "graphql-tag";

export const allMesures = gql`
  {
    mesures(order_by: { created_at: asc }, limit: 10) {
      id
      ville
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  {
    departements(order_by: { code: asc }) {
      id
      code
      nom
    }
  }
`;

export const GET_REGIONS = gql`
  {
    regions(order_by: { nom: asc }) {
      id
      nom
      departements(order_by: { nom: asc }) {
        code
        nom
      }
    }
  }
`;
