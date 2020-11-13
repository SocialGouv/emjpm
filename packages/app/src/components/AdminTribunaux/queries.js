import gql from "graphql-tag";

export const TRIBUNAUX = gql`
  query tis(
    $limit: Int
    $departementCode: String
    $searchText: String
    $offset: Int
  ) {
    tis_aggregate(
      where: {
        ville: { _ilike: $searchText }
        departement: { code: { _eq: $departementCode } }
      }
    ) {
      aggregate {
        count
      }
    }
    tis(
      limit: $limit
      order_by: { code_postal: asc }
      offset: $offset
      where: {
        ville: { _ilike: $searchText }
        departement: { code: { _eq: $departementCode } }
      }
    ) {
      id
      etablissement
      code_postal
      ville
      telephone
      email
      siret
      adresse
      latitude
      longitude
      immutable
    }
  }
`;
