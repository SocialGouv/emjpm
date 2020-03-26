import gql from "graphql-tag";

export const DELETE_MANDATAIRE_MESURE = gql`
  mutation deleteMesure($id: Int!, $mandataire_id: Int) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_mandataires(where: { id: { _eq: $mandataire_id } }) {
      affected_rows
      returning {
        id
        mesures_en_attente
      }
    }
  }
`;

export const RECALCULATE_MANDATAIRE_MESURES = gql`
  mutation update_mandataire_mesures($mandataire_id: Int!) {
    recalculateMandataireMesuresCount(mandataireId: $mandataire_id) {
      success
      updatedRows
    }
  }
`;

export const RECALCULATE_SERVICE_MESURES = gql`
  mutation update_service_mesures($service_id: Int!) {
    recalculateServiceMesuresCount(serviceId: $service_id) {
      success
      updatedRows
    }
  }
`;

export const DELETE_SERVICE_MESURE = gql`
  mutation deleteMesure($id: Int!, $service_id: Int!) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_services(where: { id: { _eq: $service_id } } {
      affected_rows
      returning {
        id
        mesures_awaiting
      }
    }
  }
`;
