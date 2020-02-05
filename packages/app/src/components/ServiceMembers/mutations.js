import gql from "graphql-tag";

export const CREATE_SERVICE_MEMBER_INVITATION = gql`
  mutation createServiceMemberInvitation(
    $email: String!
    $created_at: String!
    $service_id: Int!
    $token: String!
  ) {
    insert_service_member_invitations(
      objects: { email: $email, created_at: $created_at, service_id: $service_id, token: $token }
    ) {
      affected_rows
    }
  }
`;
