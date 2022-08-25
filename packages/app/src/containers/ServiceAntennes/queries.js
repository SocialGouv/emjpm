import gql from "graphql-tag";

export const ANTENNE = gql`
  query getServiceAntenne($serviceId: Int!) {
    service_antenne(where: { service_id: { _eq: $serviceId } }) {
      name
      id
      mesures_max
      mesures_in_progress
      mesures_awaiting
      adresse
      ville
      code_postal
      contact_email
      contact_firstname
      contact_lastname
      contact_phone
      latitude
      longitude
    }
  }
`;
