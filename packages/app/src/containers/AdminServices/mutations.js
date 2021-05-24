import gql from "graphql-tag";

export const DELETE_MESURES = gql`
  mutation admin_delete_service_mesures(
    $ids: [Int!]
    $mandataireId: Int
    $serviceId: Int
  ) {
    delete_mesures(where: { id: { _in: $ids } }) {
      affected_rows
    }
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;
