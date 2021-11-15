import gql from "graphql-tag";

export const DELETE_MESURE = gql`
  mutation delete_mesure_action($serviceId: Int) {
    delete_mesure_action(mesure_id: $mesureId) {
      success
    }
  }
`;
