import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $user_id: Int!
    $user_prenom: String!
    $user_nom: String!
    $user_email: String!
    $user_genre: String!
    $service_id: Int!
    $adresse: String
    $adresse_complement: String
    $code_postal: String
    $ville: String
    $location_adresse: String
    $dispo_max: Int
    $use_location_adresse: Boolean
    $suspend_activity: Boolean
    $suspend_activity_reason: String
    $email: String
    $competences: String
    $etablissement: String
    $nom: String
    $prenom: String
    $genre: String
    $telephone: String
    $latitude: Float
    $longitude: Float
    $service_tis: [service_tis_insert_input!]!
  ) {
    update_users(
      _set: {
        prenom: $user_prenom
        nom: $user_nom
        email: $user_email
        genre: $user_genre
      }
      where: { id: { _eq: $user_id } }
    ) {
      affected_rows
      returning {
        email
        id
        nom
        prenom
      }
    }

    delete_service_tis(where: { service_id: { _eq: $service_id } }) {
      affected_rows
    }
    insert_service_tis(objects: $service_tis) {
      affected_rows
      returning {
        id
        ti_id
        service_id
      }
    }
    update_services(
      where: { id: { _eq: $service_id } }
      _set: {
        adresse: $adresse
        adresse_complement: $adresse_complement
        code_postal: $code_postal
        ville: $ville
        location_adresse: $location_adresse
        latitude: $latitude
        longitude: $longitude
        dispo_max: $dispo_max
        suspend_activity: $suspend_activity
        suspend_activity_reason: $suspend_activity_reason
        use_location_adresse: $use_location_adresse
        email: $email
        etablissement: $etablissement
        nom: $nom
        prenom: $prenom
        genre: $genre
        telephone: $telephone
        competences: $competences
      }
    ) {
      affected_rows
      returning {
        id
        siret
        adresse
        code_postal
        email
        competences
        created_at
        dispo_max
        suspend_activity
        etablissement
        latitude
        longitude
        mesures_awaiting
        mesures_in_progress
        nom
        prenom
        siret
        telephone
        ville
      }
    }
  }
`;
