import gql from "graphql-tag";

export const CLOSE_MESURE = gql`
  mutation closeMesure($id: Int!, $reason_extinction: String!, $extinction: date!) {
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
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;

export const EDIT_MESURE = gql`
  mutation EditMesure(
    $id: Int!
    $department_id: Int
    $antenne_id: Int
    $date_ouverture: date
    $type: String
    $lieu_vie: lieu_vie_type
    $code_postal: String
    $ville: String
    $civilite: String
    $annee: String
    $numero_dossier: String
    $numero_rg: String
    $ti_id: Int!
    $latitude: Float
    $longitude: Float
    $pays: String!
    $cabinet: String
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        date_ouverture: $date_ouverture
        department_id: $department_id
        type: $type
        antenne_id: $antenne_id
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee: $annee
        ti_id: $ti_id
        numero_dossier: $numero_dossier
        numero_rg: $numero_rg
        latitude: $latitude
        longitude: $longitude
        pays: $pays
        cabinet: $cabinet
      }
    ) {
      returning {
        antenne_id
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
        lieu_vie
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

export const REACTIVATE_MESURE = gql`
  mutation reactivateMesure($id: Int!, $service_id: Int!, $reason_extinction: String!) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: { reason_extinction: $reason_extinction, status: "Mesure en cours" }
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
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;

export const DELETE_MESURE = gql`
  mutation deleteMesure($id: Int!) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
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

export const ADD_MESURE = gql`
  mutation addMesure(
    $date_ouverture: date!
    $department_id: Int
    $type: String!
    $lieu_vie: lieu_vie_type!
    $code_postal: String
    $ville: String
    $civilite: String!
    $annee: String!
    $numero_dossier: String
    $numero_rg: String!
    $antenne_id: Int
    $ti_id: Int!
    $latitude: Float
    $longitude: Float
    $pays: String!
  ) {
    insert_mesures(
      objects: {
        department_id: $department_id
        date_ouverture: $date_ouverture
        type: $type
        ti_id: $ti_id
        lieu_vie: $lieu_vie
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
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
        pays
      }
    }
  }
`;
