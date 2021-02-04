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
      redirect_uris
    }
  }
`;

export const EDITOR = gql`
  query editor($id: Int!) {
    editors_by_pk(id: $id) {
      api_token
      id
      name
      redirect_uris
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
