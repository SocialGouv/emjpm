import gql from "graphql-tag";

export const TRIBUNAUX = gql`
  query tis($limit: Int, $searchText: String, $offset: Int) {
    tis_aggregate(where: { ville: { _ilike: $searchText } }) {
      aggregate {
        count
      }
    }
    tis(
      limit: $limit
      order_by: { code_postal: asc }
      offset: $offset
      where: { _or: [{ ville: { _ilike: $searchText } }, { siret: { _ilike: $searchText } }] }
    ) {
      id
      etablissement
      code_postal
      ville
      telephone
      email
      siret
      address
      latitude
      longitude
    }
  }
`;

export const DEPARTEMENT = gql`
  query departements($code: String!) {
    departements(where: { code: { _eq: $code } }) {
      id
    }
  }
`;

export const DEPARTEMENTS = gql`
  query departements {
    departements {
      id
      code
    }
  }
`;
