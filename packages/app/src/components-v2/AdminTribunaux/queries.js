import gql from "graphql-tag";

export const TRIBUNAUX = gql`
  query services($limit: Int, $searchText: String, $offset: Int) {
    tis_aggregate(where: { ville: { _ilike: $searchText } }) {
      aggregate {
        count
      }
    }
    tis(
      limit: $limit
      order_by: { etablissement: desc }
      offset: $offset
      where: { ville: { _ilike: $searchText } }
    ) {
      id
      etablissement
      code_postal
      ville
    }
  }
`;
