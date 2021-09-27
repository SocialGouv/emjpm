import gql from "graphql-tag";

export const DELETE_ALL_MESURES = gql`
  mutation deleteAllMesures($mandataireId: Int, $serviceId: Int) {
    delete_mesures(
      where: {
        mandataire_id: { _eq: $mandataireId }
        status: { _neq: en_attente }
      }
    ) {
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
