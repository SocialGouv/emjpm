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

export const DELETE_MANDATAIRE_TIS = gql`
  mutation admin_delete_mandataire_tis($id: Int!) {
    delete_mandataire_tis(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const ADD_MANDATAIRE_TIS = gql`
  mutation admin_add_mandataire_tis($mandataireId: Int!, $tiId: Int!) {
    insert_mandataire_tis(
      objects: { ti_id: $tiId, mandataire_id: $mandataireId }
    ) {
      affected_rows
      returning {
        id
        ti_id
        mandataire_id
      }
    }
  }
`;

export const DELETE_MESURES = gql`
  mutation admin_delete_mandataire_mesures($ids: [Int!]) {
    delete_mesure_etat(where: { mesure_id: { _in: $ids } }) {
      affected_rows
    }
    delete_mesure_ressources(where: { mesure_id: { _in: $ids } }) {
      affected_rows
    }
    delete_mesures(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }
`;

export const CALCULATE_MANDATAIRE_MESURES = gql`
  mutation admin_update_mandataire_mesures(
    $userId: Int!
    $inProgressMesuresCount: Int!
    $awaitingMesuresCount: Int!
  ) {
    update_mandataires(
      where: { user_id: { _eq: $userId } }
      _set: {
        mesures_en_cours: $inProgressMesuresCount
        mesures_en_attente: $awaitingMesuresCount
      }
    ) {
      affected_rows
      returning {
        id
        user_id
        mesures_en_cours
        mesures_en_attente
      }
    }
  }
`;
