import gql from "graphql-tag";

export const ADD_COMMENT = gql`
  mutation InsertComment(
    $comment: String!
    $service_id: Int
    $ti_id: Int!
    $mandataire_id: Int
  ) {
    insert_commentaires(
      objects: {
        comment: $comment
        service_id: $service_id
        ti_id: $ti_id
        mandataire_id: $mandataire_id
      }
    ) {
      affected_rows
      returning {
        comment
        created_at
        id
        service_id
        mandataire_id
        ti_id
      }
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation UpdateComment($comment: String!, $id: Int) {
    update_commentaires(
      _set: { comment: $comment }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        comment
        created_at
        id
        service_id
        mandataire_id
        ti_id
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($id: Int!) {
    delete_commentaires(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
