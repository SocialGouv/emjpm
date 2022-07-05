import gql from "graphql-tag";

export const SERVICE_MEMBERS = gql`
  query ServiceMembers($serviceId: Int!) {
    sdpf_members(
      where: { sdpf_id: { _eq: $serviceId } }
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
