import gql from "graphql-tag";

export const EDITOR_TOKEN_REQUEST = gql`
  mutation EditorTokenRequest($email: String!, $name: String!) {
    insert_editor_token_requests(objects: { email: $email, name: $name }) {
      affected_rows
    }
  }
`;
