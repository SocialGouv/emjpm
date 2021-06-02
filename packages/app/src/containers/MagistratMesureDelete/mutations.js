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
    calculate_mesures_delayed(
      mandataireId: $mandataireId
      serviceId: $serviceId
    )
  }
`;

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;
