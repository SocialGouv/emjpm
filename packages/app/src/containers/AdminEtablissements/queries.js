import gql from "graphql-tag";

export const SEARCH_ETABLISSEMENTS = gql`
  query etablissements(
    $search: String
    $departementCode: String
    $limit: Int = 100
    $offset: Int = 0
  ) {
    search_etablissements_aggregate(
      args: { search: $search }
      where: { departement: { id: { _eq: $departementCode } } }
    ) {
      aggregate {
        count
      }
    }
    search_etablissements(
      args: { search: $search }
      limit: $limit
      offset: $offset
      where: { departement: { id: { _eq: $departementCode } } }
      order_by: { departement: { id: asc } }
    ) {
      id
      nofinesset
      siret
      rslongue
      ligneacheminement
      departement {
        id
        nom
      }
    }
  }
`;
