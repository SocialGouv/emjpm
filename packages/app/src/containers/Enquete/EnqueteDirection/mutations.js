import gql from "graphql-tag";

export const VALIDATE_ENQUETE_REPONSE = gql`
  mutation validate_enquete_reponse($reponseId: Int!) {
    update_enquete_reponses_by_pk(
      pk_columns: { id: $reponseId }
      _set: { status: validated }
    ) {
      id
    }
  }
`;
