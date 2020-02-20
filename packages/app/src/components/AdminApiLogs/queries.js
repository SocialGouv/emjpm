import gql from "graphql-tag";

export const API_LOGS = gql`
  query ApiLogs {
    api_logs {
      id
      request_url
      request_method
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

export const API_LOGS_SEARCH = gql`
  query ApiLogSearch($query: String!) {
    api_logs(
      where: {
        _or: [
          { request_url: { _ilike: $query } }
          { request_method: { _ilike: $query } }
          { token: { _ilike: $query } }
        ]
      }
    ) {
      id
      request_url
      request_method
      request_params
      response
      token
      created_at
    }
  }
`;

export const API_LOG_BY_ID = gql`
  query ApiLogById($id: Int!) {
    api_logs(where: { id: { _eq: $id } }) {
      id
      request_url
      request_method
      request_params
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
