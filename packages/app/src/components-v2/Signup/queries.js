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

export const ALL_DATA_OPTIONS = gql`
  {
    tis {
      id
      etablissement
      code_postal
      ville
    }

    departements(order_by: { nom: asc }) {
      id
      id_region
      nom
      code
    }

    services(order_by: { code_postal: asc }) {
      id
      etablissement
      code_postal
    }
  }
`;
