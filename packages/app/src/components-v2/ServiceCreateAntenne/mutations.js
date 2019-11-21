import gql from "graphql-tag";

export const CREATE_ANTENNE = gql`
  mutation createAntenne(
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
    insert_service_antenne(
      objects: {
        user_antennes: { data: { user_id: $user_id } }
        service_id: $service_id
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
