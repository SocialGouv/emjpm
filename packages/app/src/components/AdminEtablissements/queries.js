import gql from "graphql-tag";

export const ETABLISSEMENTS = gql`
  query etablissements($search: String, $limit: Int = 100, $offset: Int = 0) {
    etablissements_aggregate {
      aggregate {
        count
      }
    }
    etablissements(limit: $limit, offset: $offset, where: { nom: { _ilike: $search } }) {
      id
      nom
      ville
      code_postal
    }
  }
`;
