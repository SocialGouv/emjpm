import gql from "graphql-tag";

export const ETABLISSEMENTS = gql`
  query etablissements($search: String, $departementId: Int, $limit: Int = 100, $offset: Int = 0) {
    etablissements_aggregate {
      aggregate {
        count
      }
    }
    etablissements(
      limit: $limit
      offset: $offset
      where: { rslongue: { _ilike: $search }, departement: { id: { _eq: $departementId } } }
      order_by: { departement: { code: asc } }
    ) {
      id
      rslongue
      lieuditbp
      commune
      departement {
        id
        nom
      }
    }
  }
`;
