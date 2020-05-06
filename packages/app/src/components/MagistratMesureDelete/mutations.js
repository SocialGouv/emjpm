import gql from "graphql-tag";

export const DELETE_MANDATAIRE_MESURE = gql`
  mutation deleteMesure($id: Int!, $mandataire_id: Int) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_mandataires(where: { id: { _eq: $mandataire_id } }, _inc: { mesures_en_attente: -1 }) {
      affected_rows
      returning {
        id
        mesures_en_attente
      }
    }
  }
`;

export const DELETE_SERVICE_MESURE = gql`
  mutation deleteMesure($id: Int!, $service_id: Int!) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_services(where: { id: { _eq: $service_id } }, _inc: { mesures_awaiting: -1 }) {
      affected_rows
      returning {
        id
        mesures_awaiting
      }
    }
  }
`;
