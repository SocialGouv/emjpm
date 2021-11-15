import gql from "graphql-tag";

export const DELETE_ALL_MESURES = gql`
  mutation deleteAllMesures($mandataireId: Int, $serviceId: Int) {
    reset_mesures_calculations(
      mandataireId: $mandataireId
      serviceId: $serviceId
    ) {
      state
    }
    delete_all_mesures {
      success
    }
  }
`;
