import gql from "graphql-tag";

export const ACTIVATE_USER = gql`
  mutation activateUser($id: Int!, $active: Boolean!) {
    update_users(where: { id: { _eq: $id } }, _set: { active: $active }) {
      returning {
        id
        active
      }
    }
  }
`;
export const SEND_EMAIL_ACCOUNT_VALIDATION = gql`
  mutation email_account_validation($user_email: String!) {
    email_account_validation(user_email: $user_email)
  }
`;

export const LISTE_BLANCHE_ASSOCIATION = gql`
  mutation liste_blanche_association($mandataire_id: Int!, $lb_user_id: Int!) {
    update_mandataires_by_pk(
      pk_columns: { id: $mandataire_id }
      _set: { lb_user_id: $lb_user_id }
    ) {
      id
      lb_user_id
    }
  }
`;
