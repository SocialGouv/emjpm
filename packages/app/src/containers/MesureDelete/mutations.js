import gql from "graphql-tag";

export const DELETE_MESURE = gql`
  mutation deleteMesure(
    $id: Int!
    mandataireId: $mandataireId
    serviceId: $serviceId
  ) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
    }
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;
