import gql from "graphql-tag";

export const GET_SERVICES_DISPONIBILITY = gql`
  query ServiceDisponibility {
    services {
      mesures_in_progress
      mesures_awaiting
      dispo_max
    }
  }
`;
