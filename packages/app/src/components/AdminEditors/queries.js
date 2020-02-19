import gql from "graphql-tag";

export const EDITORS = gql`
  query editors($limit: Int, $searchText: String, $offset: Int) {
    editors(
      limit: $limit
      order_by: { id: desc }
      offset: $offset
      where: { name: { _ilike: $searchText } }
    ) {
      id
      name
      api_token
    }
  }
`;

export const EDITOR = gql`
  query editor($editorId: Int) {
    editors(where: { id: { _eq: $editorId } }) {
      id
      name
      api_token
    }
  }
`;
