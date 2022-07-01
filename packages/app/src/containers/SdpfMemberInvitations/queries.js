import gql from "graphql-tag";

export const SERVICE_MEMBER_INVITATIONS = gql`
  query ServiceMemberInvitations($serviceId: Int!) {
    service_member_invitations(
      where: { service_id: { _eq: $serviceId }, invitation_role: { _eq: dpfs } }
      order_by: { created_at: desc }
    ) {
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
