import gql from "graphql-tag";

export const CREATE_SERVICE_MEMBER_INVITATION = gql`
  mutation createServiceMemberInvitation($email: String!, $service_id: Int!) {
    insert_service_member_invitations(objects: { email: $email, service_id: $service_id }) {
      returning {
        id
        email
        created_at
      }
    }
  }
`;

export const DELETE_SERVICE_MEMBER_INVITATION = gql`
  mutation deleteServiceMemberInvitation($id: Int!) {
    delete_service_member_invitations(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
