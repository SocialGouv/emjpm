import gql from "graphql-tag";

export const SIGNUP_DATA = gql`
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

    services(order_by: { etablissement: asc }) {
      id
      etablissement
      code_postal
    }

    role {
      id
      name
    }
  }
`;
