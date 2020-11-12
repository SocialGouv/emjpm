import gql from "graphql-tag";

export const ETABLISSEMENTS = gql`
  query etablissements(
    $search: String
    $departementCode: String
    $limit: Int = 100
    $offset: Int = 0
  ) {
    etablissements_aggregate {
      aggregate {
        count
      }
    }
    etablissements(
      limit: $limit
      offset: $offset
      where: {
        _or: [
          { rslongue: { _ilike: $search } }
          { ligneacheminement: { _ilike: $search } }
        ]
        departement: { code: { _eq: $departementCode } }
      }
      order_by: { departement: { code: asc } }
    ) {
      id
      nofinesset
      siret
      rs
      rslongue
      ligneacheminement
      departement {
        id
        nom
      }
    }
  }
`;
