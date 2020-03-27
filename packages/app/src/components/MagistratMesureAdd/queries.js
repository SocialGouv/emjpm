import gql from "graphql-tag";

export const SERVICE = gql`
  query service($id: Int!) {
    services(where: { id: { _eq: $id } }) {
      id
      mesures_awaiting
      mesures_in_progress
      service_antennes {
        id
        mesures_awaiting
        mesures_in_progress
      }
    }
  }
`;

export const MANDATAIRE = gql`
  query mandataire($id: Int!) {
    mandataires(where: { id: { _eq: $id } }) {
      id
      mesures_en_attente
      mesures_en_cours
    }
  }
`;
