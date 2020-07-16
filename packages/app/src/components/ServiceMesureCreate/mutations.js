import gql from "graphql-tag";

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
    $champ_protection: champ_protection_type
    $lieu_vie: lieu_vie_type!
    $code_postal: String
    $ville: String
    $civilite: civilite_type!
    $annee_naissance: String!
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
        date_nomination: $date_nomination
        nature_mesure: $nature_mesure
        champ_protection: $champ_protection
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
        nature_mesure
        champ_protection
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
