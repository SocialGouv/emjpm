import gql from "graphql-tag";

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
