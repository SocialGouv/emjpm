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
    $date_protection_en_cours: date!
    $date_premier_mesure: date
    $department_id: Int
    $nature_mesure: nature_mesure_enum!
    $champ_mesure: champ_mesure_enum
    $lieu_vie: lieu_vie_majeur_enum!
    $type_etablissement: type_etablissement_enum
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
        mesure_etats: {
          data: [
            {
              date_changement_etat: $date_nomination
              nature_mesure: $nature_mesure
              champ_mesure: $champ_mesure
              lieu_vie: $lieu_vie
              type_etablissement: $type_etablissement
              code_postal: $code_postal
              ville: $ville
              pays: $pays
            }
          ]
        }
      }
    ) {
      returning {
        id
      }
    }
  }
`;
