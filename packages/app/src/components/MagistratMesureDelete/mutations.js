import gql from "graphql-tag";

export const DELETE_MESURE = gql`
  mutation delete_mesure_action($mesure_id: Int!) {
    delete_mesure_action(mesure_id: $mesure_id)
  }
`;

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      success
      updatedRows
    }
  }
`;
