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
    $annee_naissance: String
    $cabinet: String
    $judgment_date: date
    $is_urgent: Boolean
    $civilite: civilite_enum
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
        en_attente_reouverture: false
        date_nomination: $date_nomination
        date_protection_en_cours: $date_nomination
        lieu_vie: $lieu_vie
        code_postal: $code_postal
        ville: $ville
        latitude: $latitude
        longitude: $longitude
        pays: $pays
        annee_naissance: $annee_naissance
        cabinet: $cabinet
        judgment_date: $judgment_date
        is_urgent: $is_urgent
        civilite: $civilite
      }
    ) {
      returning {
        id
      }
    }
    delete_mesure_en_attente_reouverture(where: { mesure_id: { _eq: $id } }) {
      affected_rows
    }
    reset_mesures_calculations(
      mandataireId: $mandataireId
      serviceId: $serviceId
    ) {
      state
    }
    mesures_last_update {
      status
    }
  }
`;
