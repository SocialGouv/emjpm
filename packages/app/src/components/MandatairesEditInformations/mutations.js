import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $dispoMax: String
    $telephone: String
    $telephonePortable: String
    $ville: String
    $zipcode: String
    $longitude: String
    $latitude: String
    $adresse: String
    $codePostal: String
    $genre: String
    $cabinet: String
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
  ) {
    __typename
    update_mandataires(
      _set: {
        dispo_max: $dispoMax
        telephone: $telephone
        telephone_portable: $telephonePortable
        ville: $ville
        zip: $zipcode
        longitude: $longitude
        latitude: $latitude
        adresse: $adresse
        code_postal: $codePostal
        genre: $genre
      }
      where: { user_id: { _eq: 10 } }
    ) {
      affected_rows
    }
    update_users(
      _set: { cabinet: $cabinet, prenom: $prenom, nom: $nom, email: $email }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        cabinet
        email
        id
        nom
        prenom
      }
    }
  }
`;
