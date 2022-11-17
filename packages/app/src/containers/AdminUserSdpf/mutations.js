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
    $suspend_activity: Boolean
    $suspend_activity_reason: String
    $email: String
    $etablissement: String
    $nom: String
    $prenom: String
    $genre: String
    $telephone: String
    $latitude: Float
    $longitude: Float
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

    update_sdpf(
      where: { id: { _eq: $service_id } }
      _set: {
        adresse: $adresse
        adresse_complement: $adresse_complement
        code_postal: $code_postal
        ville: $ville
        location_adresse: $location_adresse
        latitude: $latitude
        longitude: $longitude
        suspend_activity: $suspend_activity
        suspend_activity_reason: $suspend_activity_reason
        email: $email
        etablissement: $etablissement
        nom: $nom
        prenom: $prenom
        genre: $genre
        telephone: $telephone
      }
    ) {
      affected_rows
      returning {
        id
        siret
        adresse
        code_postal
        email
        created_at
        suspend_activity
        etablissement
        latitude
        longitude
        nom
        prenom
        siret
        telephone
        ville
      }
    }
  }
`;
