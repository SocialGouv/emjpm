import gql from "graphql-tag";

export const USER = gql`
  query adminUserQuery($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      type
      active
    }
  }
`;
