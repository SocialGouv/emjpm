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

export const API_LOGS_BY_EDITOR_ID = gql`
  query ApiLogsByEditorId($editorId: Int) {
    api_logs(where: { editor_id: { _eq: $editorId } }) {
      id
      request
      response
      token
      created_at
      editor {
        id
        name
      }
    }
  }
`;
