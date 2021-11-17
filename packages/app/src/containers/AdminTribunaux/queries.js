import gql from "graphql-tag";

export const TRIBUNAUX = gql`
  query tis(
    $limit: Int
    $departementCode: String
    $searchText: String
    $offset: Int
    $immutable: Boolean
  ) {
    tis_aggregate: search_tis_aggregate(
      args: { search: $searchText }
      where: {
        immutable: { _eq: $immutable }
        departement_code: { _eq: $departementCode }
      }
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
      where: {
        immutable: { _eq: $immutable }
        departement_code: { _eq: $departementCode }
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
      actual_tribunal_id
      actual_tribunal {
        etablissement
      }
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

export const SELECT_TRIBUNAUX = gql`
  query tiImmutableSelect {
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
    }
  }
`;
