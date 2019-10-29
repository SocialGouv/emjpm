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
      where: { ville: { _ilike: $searchText } }
    ) {
      id
      etablissement
      code_postal
      ville
      telephone
      email
      siret
    }
  }
`;
