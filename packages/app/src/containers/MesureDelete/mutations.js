import gql from "graphql-tag";

export const DELETE_MESURE = gql`
  mutation deleteMesure($id: Int!, $mandataireId: Int, $serviceId: Int) {
    reset_mesures_calculations(
      mandataireId: $mandataireId
      serviceId: $serviceId
    ) {
      state
    }
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const DELETE_MESURE_REOUVERTURE = gql`
  mutation deleteMesureReouverture(
    $id: Int!
    $mandataireId: Int
    $serviceId: Int
  ) {
    reset_mesures_calculations(
      mandataireId: $mandataireId
      serviceId: $serviceId
    ) {
      state
    }
    delete_mesure_en_attente_reouverture(where: { mesure_id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
    }
    update_mesures(
      where: { id: { _eq: $id } }
      _set: { status: eteinte, en_attente_reouverture: false }
    ) {
      returning {
        id
      }
    }
  }
`;
