import gql from "graphql-tag";

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $departement_code: String
    $date_nomination: date!
    $nature_mesure: nature_mesure_enum!
    $champ_mesure: champ_mesure_enum
    $lieu_vie: lieu_vie_majeur_enum!
    $type_etablissement: type_etablissement_enum
    $code_postal: String
    $ville: String
    $antenne_id: Int
    $latitude: Float
    $longitude: Float
    $pays: String!
    $mandataireId: Int
    $serviceId: Int
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
        departement_code: $departement_code
        status: en_cours
        date_nomination: $date_nomination
        date_protection_en_cours: $date_nomination
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
        latitude: $latitude
        longitude: $longitude
        pays: $pays
      }
    ) {
      returning {
        id
      }
    }
    calculate_mesures_delayed(
      mandataireId: $mandataireId
      serviceId: $serviceId
    )
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
