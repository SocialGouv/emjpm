import gql from "graphql-tag";

export const ADMIN_INVITATIONS = gql`
  query AdminInvitations {
    admin_invitations(order_by: { created_at: desc }) {
      id
      email
      created_at
      sent_at
    }
  }
`;

export const USER_EMAIL_EXISTS = gql`
  query UserEmailExists($email: String!) {
    users(where: { email: { _eq: $email } }) {
      email
    }
  }
`;
