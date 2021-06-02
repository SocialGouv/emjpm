import gql from "graphql-tag";

export const DELETE_MESURE = gql`
  mutation deleteMesure($id: Int!, $mandataireId: Int, $serviceId: Int) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
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
