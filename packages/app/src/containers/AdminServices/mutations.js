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
    reset_mesures_calculations(
      mandataireId: $mandataireId
      serviceId: $serviceId
    ) {
      state
    }
  }
`;
