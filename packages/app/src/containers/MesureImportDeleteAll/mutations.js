import gql from "graphql-tag";

export const DELETE_ALL_MESURES = gql`
  mutation deleteAllMesures($mandataireId: Int, $serviceId: Int) {
    delete_mesures(
      where: {
        _or: [
          {
            _and: [
              { mandataire_id: { _eq: $mandataireId } }
              { mandataire_id: { _is_null: false } }
            ]
          }
          {
            _and: [
              { service_id: { _eq: $serviceId } }
              { service_id: { _is_null: false } }
            ]
          }
        ]
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
