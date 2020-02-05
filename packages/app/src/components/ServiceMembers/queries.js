import gql from "graphql-tag";

export const SERVICE_MEMBER_INVITATIONS = gql`
  query ServiceMemberInvitations($serviceId: Int!) {
    service_member_invitations(where: { service_id: { _eq: $serviceId } }) {
      id
      email
      created_at
      sent_at
    }
  }
`;
