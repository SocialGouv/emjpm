import gql from "graphql-tag";

export const MANDATAIRE = gql`
  query mandataire($id: Int) {
    mandataires(where: { id: { _eq: $id } }) {
      id
      mesures_en_attente
      mesures_en_cours
    }
  }
`;

export const MESURE = gql`
  query mesure($id: Int!) {
    mesures(where: { id: { _eq: $id } }) {
      id
      service_id
      antenne_id
    }
  }
`;
