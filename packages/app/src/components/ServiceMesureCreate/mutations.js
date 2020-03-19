import gql from "graphql-tag";

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

export const ADD_MESURE = gql`
  mutation addMesure(
    $date_ouverture: date!
    $department_id: Int
    $type: String!
    $residence: String!
    $code_postal: String
    $ville: String
    $civilite: String!
    $annee: String!
    $numero_dossier: String!
    $numero_rg: String!
    $antenne_id: Int
    $ti_id: Int!
    $latitude: Float
    $longitude: Float
    $pays: String!
    $cabinet: String
  ) {
    insert_mesures(
      objects: {
        department_id: $department_id
        date_ouverture: $date_ouverture
        type: $type
        ti_id: $ti_id
        residence: $residence
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee: $annee
        numero_dossier: $numero_dossier
        numero_rg: $numero_rg
        status: "Mesure en cours"
        antenne_id: $antenne_id
        latitude: $latitude
        longitude: $longitude
        pays: $pays
        cabinet: $cabinet
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
          id
          nom
          region {
            id
            nom
          }
        }
        status
        type
        ville
        latitude
        longitude
        residence
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
        pays
        cabinet
      }
    }
  }
`;
