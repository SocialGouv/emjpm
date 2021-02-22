import gql from "graphql-tag";

export const ETABLISSEMENTS = gql`
  query etablissements(
    $search: String
    $departementCode: String
    $limit: Int = 100
    $offset: Int = 0
  ) {
    etablissements_aggregate(
      where: {
        _or: [
          { rslongue: { _ilike: $search } }
          { ligneacheminement: { _ilike: $search } }
          { nofinesset: { _ilike: $search } }
        ]
        departement: { id: { _eq: $departementCode } }
      }
    ) {
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
          { nofinesset: { _ilike: $search } }
        ]
        departement: { id: { _eq: $departementCode } }
      }
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
