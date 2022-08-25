import gql from "graphql-tag";

export const CREATE_ANTENNE = gql`
  mutation createAntenne(
    $serviceId: Int!
    $name: String
    $mesures_max: Int
    $contact_phone: String
    $contact_lastname: String
    $contact_firstname: String
    $contact_email: String
    $code_postal: String
    $departement_code: String
    $adresse: String
    $ville: String
    $latitude: Float
    $longitude: Float
  ) {
    insert_service_antenne(
      objects: {
        name: $name
        mesures_max: $mesures_max
        contact_phone: $contact_phone
        contact_lastname: $contact_lastname
        contact_firstname: $contact_firstname
        contact_email: $contact_email
        code_postal: $code_postal
        departement_code: $departement_code
        adresse: $adresse
        ville: $ville
        latitude: $latitude
        longitude: $longitude
        service_id: $serviceId
      }
    ) {
      returning {
        ville
        adresse
        code_postal
        departement_code
        latitude
        longitude
        contact_email
        contact_firstname
        contact_lastname
        contact_phone
        id
        mesures_max
        name
        service_id
      }
    }
  }
`;
