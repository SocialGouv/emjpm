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
    $address_zip_code: String
    $address_street: String
    $address_city: String
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
        address_zip_code: $address_zip_code
        address_street: $address_street
        address_city: $address_city
      }
    ) {
      returning {
        address_city
        address_street
        address_zip_code
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
