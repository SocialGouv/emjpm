import gql from "graphql-tag";

export const CLOSE_MESURE = gql`
  mutation closeMesure($id: Int!, $cause_sortie: cause_sortie_type!, $date_fin_mesure: date!) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: { date_fin_mesure: $date_fin_mesure, cause_sortie: $cause_sortie, status: "eteinte" }
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
        nature_mesure
        champ_mesure
        ville
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee_naissance
        date_nomination
      }
    }
  }
`;

export const EDIT_MESURE = gql`
  mutation EditMesure(
    $id: Int!
    $department_id: Int
    $antenne_id: Int
    $date_nomination: date
    $nature_mesure: nature_mesure_type!
    $champ_mesure: champ_mesure_type
    $lieu_vie: lieu_vie_type
    $code_postal: String
    $ville: String
    $civilite: civilite_type
    $annee_naissance: String
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
        date_nomination: $date_nomination
        department_id: $department_id
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        antenne_id: $antenne_id
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee_naissance: $annee_naissance
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
        nature_mesure
        champ_mesure
        ville
        latitude
        longitude
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee_naissance
        date_nomination
        pays
        cabinet
      }
    }
  }
`;

export const REACTIVATE_MESURE = gql`
  mutation reactivateMesure($id: Int!) {
    update_mesures(where: { id: { _eq: $id } }, _set: { status: "en_cours" }) {
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
        nature_mesure
        champ_mesure
        ville
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee_naissance
        date_nomination
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
    $date_nomination: date!
    $department_id: Int
    $nature_mesure: nature_mesure_type!
    $champ_mesure: champ_mesure_type
    $lieu_vie: lieu_vie_type!
    $code_postal: String
    $ville: String
    $civilite: civilite_type!
    $annee_naissance: String!
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
        date_nomination: $date_nomination
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        ti_id: $ti_id
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee_naissance: $annee_naissance
        numero_dossier: $numero_dossier
        numero_rg: $numero_rg
        status: "en_cours"
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
        nature_mesure
        champ_mesure
        ville
        latitude
        longitude
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee_naissance
        date_nomination
        pays
      }
    }
  }
`;

export const EXPORT_MESURES_EXCEL_FILE = gql`
  mutation export_mesures_file($serviceId: Int, $mandataireUserId: Int) {
    export_mesures_file(serviceId: $serviceId, mandataireUserId: $mandataireUserId) {
      data
    }
  }
`;
