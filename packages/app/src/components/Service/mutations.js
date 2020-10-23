import gql from "graphql-tag";

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: Int!
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $siret: String!
    $email: String
    $telephone: String
    $department_id: Int!
    $adresse: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    update_services(
      where: { id: { _eq: $id } }
      _set: {
        etablissement: $etablissement
        siret: $siret
        code_postal: $code_postal
        department_id: $department_id
        ville: $ville
        email: $email
        telephone: $telephone
        adresse: $adresse
        latitude: $latitude
        longitude: $longitude
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
        department_id
        dispo_max
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

export const ADD_SERVICE = gql`
  mutation addService(
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $email: String
    $telephone: String
    $department_id: Int!
    $adresse: String!
    $latitude: Float!
    $longitude: Float!
    $siret: String!
  ) {
    insert_services(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        email: $email
        department_id: $department_id
        telephone: $telephone
        adresse: $adresse
        latitude: $latitude
        longitude: $longitude
        siret: $siret
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
        siret
      }
    }
  }
`;

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      success
      updatedRows
    }
  }
`;
