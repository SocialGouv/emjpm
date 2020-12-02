import gql from "graphql-tag";

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int
    $date_nomination: date!
    $nature_mesure: nature_mesure_enum!
    $champ_mesure: champ_mesure_enum!
    $lieu_vie: lieu_vie_majeur_enum!
    $type_etablissement: type_etablissement_enum
    $code_postal: String
    $ville: String
    $antenne_id: Int
    $latitude: Float
    $longitude: Float
    $pays: String!
  ) {
    insert_mesure_etat(
      objects: {
        mesure_id: $id
        date_changement_etat: $date_nomination
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        lieu_vie: $lieu_vie
        type_etablissement: $type_etablissement
        code_postal: $code_postal
        ville: $ville
        pays: $pays
      }
    ) {
      returning {
        id
      }
    }
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        antenne_id: $antenne_id
        department_id: $department_id
        status: en_cours
        date_nomination: $date_nomination
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
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
        lieu_vie
        numero_rg
        numero_dossier
        annee_naissance
        date_nomination
        pays
      }
    }
  }
`;

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;
