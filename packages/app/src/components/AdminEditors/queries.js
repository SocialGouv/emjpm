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
  query editor($editorId: Int, $limit: Int, $offset: Int) {
    editors(where: { id: { _eq: $editorId } }, limit: $limit, offset: $offset) {
      id
      name
      api_token
    }
  }
`;

export const EDITOR_REQUESTS = gql`
  query editorRequests($limit: Int, $offset: Int) {
    editor_token_requests(limit: $limit, offset: $offset) {
      name
      id
      email
      created_at
    }
  }
`;
