import gql from "graphql-tag";

export const INDICATORS = gql`
  query Indicators {
    view_indicateur_inscrit {
      nom
      count
    }
    view_indicateur_login {
      count
      nom
    }
  }
`;
