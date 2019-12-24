import gql from "graphql-tag";

export const GET_SERVICES_DISPONIBILITY = gql`
  query ServiceDisponibility {
    services {
      id
      mesures_in_progress
      mesures_awaiting
      dispo_max
    }
  }
`;
