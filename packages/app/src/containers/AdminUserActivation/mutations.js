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

export const LISTE_BLANCHE_ASSOCIATION_MANDATAIRE = gql`
  mutation liste_blanche_association(
    $mandataire_id: Int!
    $liste_blanche_id: Int!
  ) {
    update_mandataires_by_pk(
      pk_columns: { id: $mandataire_id }
      _set: { liste_blanche_id: $liste_blanche_id }
    ) {
      id
      liste_blanche_id
    }
  }
`;

export const LISTE_BLANCHE_ASSOCIATION_DPFI = gql`
  mutation liste_blanche_association(
    $mandataire_id: Int!
    $liste_blanche_id: Int!
  ) {
    update_dpfi_by_pk(
      pk_columns: { id: $mandataire_id }
      _set: { liste_blanche_id: $liste_blanche_id }
    ) {
      id
      liste_blanche_id
    }
  }
`;
