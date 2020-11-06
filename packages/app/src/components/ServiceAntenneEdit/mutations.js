import gql from "graphql-tag";

export const EDIT_ANTENNE = gql`
  mutation editAntenne(
    $antenne_id: Int
    $user_id: Int
    $service_id: Int
    $name: String
    $mesures_max: Int
    $contact_phone: String
    $contact_lastname: String
    $contact_firstname: String
    $contact_email: String
    $code_postal: String
    $adresse: String
    $ville: String
    $latitude: Float
    $longitude: Float
  ) {
    update_service_antenne(
      where: { id: { _eq: $antenne_id } }
      _set: {
        name: $name
        mesures_max: $mesures_max
        contact_phone: $contact_phone
        contact_lastname: $contact_lastname
        contact_firstname: $contact_firstname
        contact_email: $contact_email
        code_postal: $code_postal
        adresse: $adresse
        ville: $ville
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      returning {
        ville
        adresse
        code_postal
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
