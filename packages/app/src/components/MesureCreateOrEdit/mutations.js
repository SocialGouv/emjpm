import gql from "graphql-tag";

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;

export const ADD_MESURE = gql`
  mutation addMesure(
    $date_nomination: date!
    $department_id: Int
    $nature_mesure: nature_mesure_enum!
    $champ_mesure: champ_mesure_enum
    $lieu_vie: lieu_vie_majeur_enum!
    $code_postal: String
    $ville: String
    $civilite: civilite_enum!
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
    add_or_update: insert_mesures(
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
        status: en_cours
        antenne_id: $antenne_id
        latitude: $latitude
        longitude: $longitude
        pays: $pays
        cabinet: $cabinet
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int
    $antenne_id: Int
    $date_nomination: date
    $nature_mesure: nature_mesure_enum!
    $champ_mesure: champ_mesure_enum
    $lieu_vie: lieu_vie_majeur_enum
    $code_postal: String
    $ville: String
    $civilite: civilite_enum
    $annee_naissance: String
    $numero_dossier: String
    $numero_rg: String
    $ti_id: Int!
    $latitude: Float
    $longitude: Float
    $pays: String!
    $cabinet: String
  ) {
    add_or_update: update_mesures(
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
        annee_naissance
        date_nomination
        pays
        cabinet
      }
    }
  }
`;
