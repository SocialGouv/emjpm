import gql from "graphql-tag";

export const DELETE_MESURE = gql`
  mutation delete_mesure_action(
    $mesureId: Int!
    $mandataireId: Int
    $serviceId: Int
  ) {
    delete_mesure_action(mesure_id: $mesureId) {
      success
    }
    reset_mesures_calculations(
      mandataireId: $mandataireId
      serviceId: $serviceId
    ) {
      state
    }
    mesures_last_update {
      status
    }
  }
`;
