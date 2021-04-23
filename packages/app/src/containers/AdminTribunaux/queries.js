import gql from "graphql-tag";

export const TRIBUNAUX = gql`
  query tis(
    $limit: Int
    $departementCode: String
    $searchText: String
    $offset: Int
  ) {
    tis_aggregate: search_tis_aggregate(
      args: { search: $searchText }
      where: { departement: { id: { _eq: $departementCode } } }
    ) {
      aggregate {
        count
      }
    }
    tis: search_tis(
      limit: $limit
      order_by: { code_postal: asc }
      offset: $offset
      args: { search: $searchText }
      where: { departement: { id: { _eq: $departementCode } } }
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
      magistrats {
        id
        user {
          id
          email
          nom
          prenom
        }
      }
      magistrats_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
