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

export const CHANGE_DIRECTION_AGREMENT = gql`
  mutation change_direction_roles(
    $user_id: Int!
    $direction_id: Int!
    $direction_role_id: Int!
    $new_direction_role_id: Int!
    $type: String!
    $department_id: Int
    $region_id: Int
  ) {
    delete_user_role(where: { user_id: { _eq: $user_id } }) {
      affected_rows
    }
    insert_user_role(
      objects: [
        { role_id: $direction_role_id, user_id: $user_id }
        { role_id: $new_direction_role_id, user_id: $user_id }
      ]
    ) {
      affected_rows
    }
    update_direction_by_pk(
      pk_columns: { id: $direction_id }
      _set: {
        department_id: $department_id
        region_id: $region_id
        type: $type
      }
    ) {
      id
      department_id
      region_id
      type
    }
  }
`;

export const DELETE_MAGISTRAT = gql`
  mutation deleteMagistrat($id: Int!) {
    delete_magistrat(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
