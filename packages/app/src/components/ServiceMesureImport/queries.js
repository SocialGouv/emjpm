import gql from "graphql-tag";

export const MESURE_IMPORTS = gql`
  {
    mesures_import {
      id
      created_at
      processed_at
      file_name
      file_size
      file_type
      status
    }
  }
`;

export const SERVICE_ANTENNES = gql`
  query ServiceAntennes($service_id: Int!) {
    antennes: service_antenne(where: { service_id: { _eq: $service_id } }) {
      id
      name
    }
  }
`;
