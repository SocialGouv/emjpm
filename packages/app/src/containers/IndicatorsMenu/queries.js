import gql from "graphql-tag";

export const INDICATORS = gql`
  query Departements {
    departements {
      id
      nom
    }
  }
`;
