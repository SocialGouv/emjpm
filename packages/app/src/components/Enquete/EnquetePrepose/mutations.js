import gql from "graphql-tag";

export const SUBMIT_ENQUETE_PREPOSE = gql`
  mutation submit_enquete_prepose($id: Int!) {
    submit_enquete_prepose(id: $id) {
      enquete_id
      enquete_reponses_id
      submitted_at
    }
  }
`;
