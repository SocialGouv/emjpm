import gql from "graphql-tag";

export const CLOSE_MESURE = gql`
  mutation closeMesure(
    $id: Int!
    $service_id: Int!
    $reason_extinction: String!
    $extinction: date!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        extinction: $extinction
        reason_extinction: $reason_extinction
        status: "Eteindre mesure"
      }
    ) {
      returning {
        antenne_id
        service_id
        id
        cabinet
        civilite
        code_postal
        departement {
          nom
          region {
            nom
          }
        }
        status
        type
        ville
        residence
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;

export const UPDATE_ANTENNE_COUTERS = gql`
  mutation updateAntenneCounters(
    $antenne_id: Int!
    $inc_mesures_in_progress: Int!
    $inc_mesures_awaiting: Int!
  ) {
    update_service_antenne(
      where: { id: { _eq: $antenne_id } }
      _inc: {
        mesures_in_progress: $inc_mesures_in_progress
        mesures_awaiting: $inc_mesures_awaiting
      }
    ) {
      affected_rows
      returning {
        id
        mesures_in_progress
      }
    }
  }
`;

export const UPDATE_SERVICES_COUTERS = gql`
  mutation UpdateServicesCounter(
    $service_id: Int!
    $mesures_in_progress: Int!
    $mesures_awaiting: Int!
  ) {
    update_services(
      where: { id: { _eq: $service_id } }
      _inc: { mesures_in_progress: $mesures_in_progress, mesures_awaiting: $mesures_awaiting }
    ) {
      affected_rows
      returning {
        id
        mesures_in_progress
        mesures_awaiting
      }
    }
  }
`;
