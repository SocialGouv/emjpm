import gql from "graphql-tag";

export const RESET_PASSWORD = gql`
  mutation resetPassword($id: Int!) {
    admin_reset_user_password(id: $id) {
      password
    }
  }
`;
