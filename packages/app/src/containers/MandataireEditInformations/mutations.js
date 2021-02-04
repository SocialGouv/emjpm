import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $dispo_max: Int!
    $telephone: String
    $telephone_portable: String
    $ville: String
    $longitude: Float!
    $latitude: Float!
    $adresse: String!
    $code_postal: String!
    $genre: String
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
    $mandataire_id: Int!
    $mandataire_tis: [mandataire_tis_insert_input!]!
    $department_id: Int!
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
        telephone: $telephone
        telephone_portable: $telephone_portable
        ville: $ville
        longitude: $longitude
        latitude: $latitude
        adresse: $adresse
        code_postal: $code_postal
        genre: $genre
        department_id: $department_id
        competences: $competences
        siret: $siret
      }
      where: { user_id: { _eq: $id } }
    ) {
      affected_rows
    }
    update_users(
      _set: { prenom: $prenom, nom: $nom, email: $email, username: $email }
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
