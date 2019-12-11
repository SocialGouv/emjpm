import gql from "graphql-tag";

export const GET_SERVICES_ANTENNE = gql`
  query service_antenne($antenneId: Int!) {
    service_antenne(where: { id: { _eq: $antenneId } }) {
      address_city
      address_street
      address_zip_code
      bak_mandataire_id
      contact_email
      service_id
      name
      mesures_max
      mesures_in_progress
      mesures_awaiting
      id
      date_mesure_update
      created_at
      contact_phone
      contact_lastname
      contact_firstname
      service {
        service_tis {
          ti {
            etablissement
            id
          }
        }
      }
    }
  }
`;
