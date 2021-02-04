import gql from "graphql-tag";

export const API_LOGS_SEARCH = gql`
  query ApiLogSearch($search: String, $limit: Int = 100, $offset: Int = 0) {
    api_logs_aggregate(
      where: {
        _or: [
          { request_url: { _ilike: $search } }
          { request_method: { _ilike: $search } }
          { token: { _ilike: $search } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    api_logs(
      limit: $limit
      offset: $offset
      where: {
        _or: [
          { request_url: { _ilike: $search } }
          { request_method: { _ilike: $search } }
          { token: { _ilike: $search } }
        ]
      }
      order_by: { created_at: desc }
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
