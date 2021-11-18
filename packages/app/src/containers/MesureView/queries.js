import gql from "graphql-tag";

export const MESURE_EMAIL_MAGISTRAT = gql`
  query MESURE_EMAIL_MAGISTRAT($id: Int!) {
    mesures_by_pk(id: $id) {
      email_magistrat
      email_greffier
    }
  }
`;
