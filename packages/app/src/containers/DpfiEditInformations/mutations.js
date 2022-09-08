import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $suspend_activity: Boolean
    $suspend_activity_reason: String
    $telephone: String
    $telephone_portable: String
    $ville: String
    $longitude: Float!
    $latitude: Float!
    $location_adresse: String!
    $adresse_complement: String!
    $code_postal: String!
    $genre: String
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
    $departement_code: String!
    $siret: String
  ) {
    update_dpfi(
      _set: {
        suspend_activity: $suspend_activity
        suspend_activity_reason: $suspend_activity_reason
        telephone: $telephone
        telephone_portable: $telephone_portable
        adresse_complement: $adresse_complement
        longitude: $longitude
        latitude: $latitude
        location_adresse: $location_adresse
        ville: $ville
        code_postal: $code_postal
        departement_code: $departement_code
        siret: $siret
      }
      where: { user_id: { _eq: $id } }
    ) {
      affected_rows
    }
    update_users(
      _set: { prenom: $prenom, nom: $nom, email: $email, genre: $genre }
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
