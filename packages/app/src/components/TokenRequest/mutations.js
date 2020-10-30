import gql from "graphql-tag";

export const EDITOR_TOKEN_REQUEST = gql`
  mutation EditorTokenRequest($email: String!, $name: String!) {
    insert_editor_token_requests(objects: { email: $email, name: $name }) {
      affected_rows
    }
  }
`;

export const SEND_EMAIL_TOKEN_REQUEST = gql`
  mutation EmailTokenRequest($email: String!, $name: String!) {
    email_token_request(email: $email, name: $name)
  }
`;
