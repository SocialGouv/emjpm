import gql from "graphql-tag";

export const CREATE_ADMIN_INVITATION = gql`
  mutation createAdminInvitation($email: String!) {
    insert_admin_invitations(objects: { email: $email }) {
      returning {
        id
        email
        created_at
      }
    }
  }
`;

export const DELETE_ADMIN_INVITATION = gql`
  mutation deleteAdminInvitation($id: Int!) {
    delete_admin_invitations(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
