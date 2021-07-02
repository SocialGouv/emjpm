import gql from "graphql-tag";

export const DELETE_MESURE = gql`
  mutation deleteMesure($id: Int!, $mandataireId: Int, $serviceId: Int) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
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
