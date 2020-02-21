import gql from "graphql-tag";

export const ADD_EDITOR = gql`
  mutation addEditor($name: String!, $api_token: String!) {
    insert_editors(objects: { name: $name, api_token: $api_token }) {
      returning {
        name
        api_token
      }
    }
  }
`;

export const ADD_EDITOR_FROM_REQUEST = gql`
  mutation addEditorFormRequest($name: String!, $api_token: String!, $id: Int) {
    insert_editors(objects: { name: $name, api_token: $api_token }) {
      returning {
        name
        api_token
      }
    }
    delete_editor_token_requests(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const REMOVE_EDITOR = gql`
  mutation removeEditor($id: Int) {
    delete_editors(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
