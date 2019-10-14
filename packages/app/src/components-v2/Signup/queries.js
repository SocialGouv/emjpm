import gql from "graphql-tag";

export const CHECK_EMAIL_UNICITY = gql`
  query users($email: String) {
    users_aggregate(where: { email: { _ilike: $email } }) {
      aggregate {
        count
      }
    }
  }
`;
