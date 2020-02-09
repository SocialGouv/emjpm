import gql from "graphql-tag";

export const SERVICE_MEMBER_INVITATIONS = gql`
  query ServiceMemberInvitations($serviceId: Int!) {
    service_member_invitations(
      where: { service_id: { _eq: $serviceId } }
      order_by: { created_at: desc }
    ) {
      id
      email
      created_at
      sent_at
    }
  }
`;

export const SERVICE_MEMBERS = gql`
  query ServiceMembers($serviceId: Int!) {
    service_members(
      where: { service_id: { _eq: $serviceId } }
      order_by: { user: { created_at: desc } }
    ) {
      id
      is_admin
      user_id
      user {
        id
        email
        created_at
        active
      }
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
