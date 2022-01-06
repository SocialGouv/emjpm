import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $dispo_max: Int!
    $suspend_activity: Boolean
    $suspend_activity_reason: String
    $telephone: String
    $telephone_portable: String
    $location_ville: String
    $longitude: Float!
    $latitude: Float!
    $location_adresse: String!
    $adresse: String!
    $location_code_postal: String!
    $genre: String
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
    $mandataire_id: Int!
    $mandataire_tis: [mandataire_tis_insert_input!]!
    $departement_code: String!
    $competences: String
    $siret: String
  ) {
    delete_mandataire_tis(where: { mandataire_id: { _eq: $mandataire_id } }) {
      affected_rows
    }
    insert_mandataire_tis(objects: $mandataire_tis) {
      affected_rows
      returning {
        id
        ti_id
        mandataire_id
      }
    }
    update_mandataires(
      _set: {
        dispo_max: $dispo_max
        suspend_activity: $suspend_activity
        suspend_activity_reason: $suspend_activity_reason
        telephone: $telephone
        telephone_portable: $telephone_portable
        adresse: $adresse
        longitude: $longitude
        latitude: $latitude
        location_adresse: $location_adresse
        location_ville: $location_ville
        location_code_postal: $location_code_postal
        genre: $genre
        departement_code: $departement_code
        competences: $competences
        siret: $siret
      }
      where: { user_id: { _eq: $id } }
    ) {
      affected_rows
    }
    update_users(
      _set: { prenom: $prenom, nom: $nom, email: $email }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        id
        email
        nom
        prenom
      }
    }
  }
`;
