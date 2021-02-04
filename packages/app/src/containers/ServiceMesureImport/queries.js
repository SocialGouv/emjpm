import gql from "graphql-tag";

export const SERVICE_ANTENNES = gql`
  query ServiceAntennes($service_id: Int!) {
    antennes: service_antenne(where: { service_id: { _eq: $service_id } }) {
      id
      name
    }
  }
`;
