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
  query ApiLogSearch($search: String!) {
    api_logs(
      where: {
        _or: [
          { request_url: { _ilike: $search } }
          { request_method: { _ilike: $search } }
          { token: { _ilike: $search } }
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
