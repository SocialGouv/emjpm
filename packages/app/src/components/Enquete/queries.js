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
  query enquete_reponse_validation_status($enqueteId: Int!, $userId: Int, $reponseId: Int) {
    enquete_reponse_validation_status(
      enqueteId: $enqueteId
      userId: $userId
      reponseId: $reponseId
    ) {
      status
      user_type
      submitted_at
      enquete_id
      enquete_reponse_ids
      enquete_reponse_validation_status
    }
  }
`;
// init reponse from userId or get response from reponseId
export const ENQUETE_WITH_REPONSE_STATUS = gql`
  query enquete_reponse_validation_status($enqueteId: Int!, $userId: Int, $reponseId: Int) {
    enquetes_by_pk(id: $enqueteId) {
      id
      created_at
      annee
      date_fin
    }
    enquete_reponse_validation_status(
      enqueteId: $enqueteId
      userId: $userId
      reponseId: $reponseId
    ) {
      status
      submitted_at
      enquete_id
      user_type
      mandataire
      service
      enquete_reponse_ids
      enquete_reponse_validation_status
    }
  }
`;
