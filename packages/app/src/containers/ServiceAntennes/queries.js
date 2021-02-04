import gql from "graphql-tag";

export const ANTENNE = gql`
  {
    service_antenne {
      name
      mesures_aggregate {
        aggregate {
          count
        }
      }
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
