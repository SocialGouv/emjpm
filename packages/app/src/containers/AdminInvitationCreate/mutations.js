import gql from "graphql-tag";

export const CREATE_ADMIN_INVITATION = gql`
  mutation createAdminInvitation($email: String!) {
    insert_admin_invitations(objects: { email: $email }) {
      returning {
        id
      }
    }
  }
`;

export const SEND_EMAIL_ADMIN_INVITATION = gql`
  mutation sendEmailAdminInvitation($invitation_id: Int!) {
    email_admin_invitation(invitation_id: $invitation_id)
  }
`;

export const DELETE_ADMIN_INVITATION = gql`
  mutation deleteAdminInvitation($id: Int!) {
    delete_admin_invitations(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
