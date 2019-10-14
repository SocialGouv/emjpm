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

export const TRIBUNAUX = gql`
  {
    tis {
      id
      etablissement
      code_postal
      ville
    }
  }
`;

export const REGIONS = gql`
  {
    regions(order_by: { nom: asc }) {
      id
      nom
      departements(order_by: { nom: asc }) {
        id
        nom
      }
    }
  }
`;
