import gql from "graphql-tag";

export const GET_SERVICES_ANTENNE = gql`
  query service_antenne($antenneId: Int!) {
    service_antenne(where: { id: { _eq: $antenneId } }) {
      mesures_awaiting
      mesures_in_progress
      mesures_max
    }
  }
`;
