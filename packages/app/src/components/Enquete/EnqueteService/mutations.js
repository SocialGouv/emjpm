import gql from "graphql-tag";

export const SUBMIT_ENQUETE_REPONSE = gql`
  mutation submit_enquete_reponse($enqueteId: Int!) {
    submit_enquete_reponse(enqueteId: $enqueteId) {
      enquete_id
      enquete_reponses_id
      submitted_at
    }
  }
`;
