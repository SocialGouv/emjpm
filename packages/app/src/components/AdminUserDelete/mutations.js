import gql from "graphql-tag";

export const DELETE_USER = gql`
  mutation delete_user($userId: Int!) {
    delete_users_by_pk(id: $userId) {
      id
    }
  }
`;
