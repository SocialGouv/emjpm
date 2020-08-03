import gql from "graphql-tag";

export const GET_SERVICES_ANTENNE = gql`
  query service_antenne($antenneId: Int!) {
    service_antenne(where: { id: { _eq: $antenneId } }) {
      address
      address_city
      address_street
      address_zip_code
      latitude
      longitude
      contact_email
      service_id
      name
      mesures_max
      mesures_in_progress
      mesures_awaiting
      id
      created_at
      contact_phone
      contact_lastname
      contact_firstname
      service {
        id
        service_tis {
          id
          ti {
            etablissement
            id
          }
        }
      }
    }
  }
`;
