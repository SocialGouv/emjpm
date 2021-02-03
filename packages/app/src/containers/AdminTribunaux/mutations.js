import gql from "graphql-tag";

export const UPDATE_TRIBUNAL = gql`
  mutation UpdateTribunal(
    $id: Int!
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $email: String
    $telephone: String
    $siret: String
    $adresse: String!
    $latitude: Float!
    $longitude: Float!
    $departement_code: Int!
  ) {
    update_tis(
      where: { id: { _eq: $id } }
      _set: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        email: $email
        telephone: $telephone
        siret: $siret
        adresse: $adresse
        latitude: $latitude
        longitude: $longitude
        departement_code: $departement_code
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_TRIBUNAL = gql`
  mutation addTribunal(
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $adresse: String!
    $latitude: Float!
    $longitude: Float!
    $email: String!
    $telephone: String!
    $siret: String!
    $departement_code: String!
  ) {
    insert_tis(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        email: $email
        telephone: $telephone
        siret: $siret
        adresse: $adresse
        latitude: $latitude
        longitude: $longitude
        departement_code: $departement_code
      }
    ) {
      returning {
        id
        etablissement
        code_postal
        ville
        telephone
        email
        adresse
        latitude
        longitude
      }
    }
  }
`;
