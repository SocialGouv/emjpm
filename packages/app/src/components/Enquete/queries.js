import gql from "graphql-tag";

export const ENQUETE = gql`
  query enquete($id: Int!) {
    enquetes_by_pk(id: $id) {
      id
      created_at
      annee
      date_fin
    }
  }
`;

export const ENQUETE_REPONSE_STATUS = gql`
  query enquete_reponse_validation_status($enqueteId: Int!, $userId: Int!) {
    enquete_reponse_validation_status(enqueteId: $enqueteId, userId: $userId) {
      status
      submitted_at
      enquete_id
      enquete_reponse_ids
      enquete_reponse_validation_status
    }
  }
`;
