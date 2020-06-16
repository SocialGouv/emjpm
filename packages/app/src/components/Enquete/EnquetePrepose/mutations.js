import gql from "graphql-tag";

export const SUBMIT_ENQUETE = gql`
  mutation submit_enquete_individuel($id: Int!) {
    submit_enquete_individuel(id: $id) {
      enquete_id
      enquete_reponses_id
      submitted_at
    }
  }
`;
