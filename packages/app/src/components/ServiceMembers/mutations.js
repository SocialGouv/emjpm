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

export const DELETE_SERVICE_MEMBER = gql`
  mutation deleteServiceMember($id: Int!) {
    delete_service_members(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const UPDATE_SERVICE_MEMBER_IS_ADMIN = gql`
  mutation updateServiceMemberIsAdmin($id: Int!, $is_admin: Boolean!) {
    update_service_members(where: { id: { _eq: $id } }, _set: { is_admin: $is_admin }) {
      affected_rows
    }
  }
`;
