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

export const DELETE_MAGISTRAT = gql`
  mutation deleteMagistrat($id: Int!) {
    delete_magistrat(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const DELETE_USER_TIS = gql`
  mutation admin_delete_user_tis($id: Int!) {
    delete_user_tis(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const ADD_MAGISTRAT = gql`
  mutation admin_add_magistrat($userId: Int!, $tiId: Int!) {
    insert_magistrat(objects: { ti_id: $tiId, user_id: $userId }) {
      affected_rows
      returning {
        id
        ti_id
        user_id
      }
    }
  }
`;

export const ADD_USER_TIS = gql`
  mutation admin_add_user_tis($userId: Int!, $tiId: Int!) {
    insert_user_tis(objects: { ti_id: $tiId, user_id: $userId }) {
      affected_rows
      returning {
        id
        ti_id
        user_id
      }
    }
  }
`;

export const DELETE_MESURES = gql`
  mutation admin_delete_mandataire_mesures($ids: [Int!]) {
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
      _set: { mesures_en_cours: $inProgressMesuresCount, mesures_en_attente: $awaitingMesuresCount }
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
