import gql from "graphql-tag";

export const ETABLISSEMENTS = gql`
  query etablissements($limit: Int = 100, $offset: Int = 0) {
    etablissements_aggregate {
      aggregate {
        count
      }
    }
    etablissements(limit: $limit, offset: $offset) {
      id
      nom
      ville
      code_postal
    }
  }
`;
