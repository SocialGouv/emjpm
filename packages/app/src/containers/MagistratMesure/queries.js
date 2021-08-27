import gql from "graphql-tag";

export const MESURE_EMAIL_SERVICE = gql`
  query MESURE_EMAIL_SERVICE($id: Int!) {
    mesures_by_pk(id: $id) {
      email_service
    }
  }
`;

export const MESURE_EMAIL_MANDATAIRE = gql`
  query MESURE_EMAIL_MANDATAIRE($id: Int!) {
    mesures_by_pk(id: $id) {
      email_mandataire
    }
  }
`;
