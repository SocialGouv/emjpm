import gql from "graphql-tag";

export const CHECK_EMAIL_UNICITY = gql`
  {
    users {
      email
    }
  }
`;

export const CHECK_SIRET_UNICITY = gql`
  query MANDATAIRE_SIRET($siret: String!) {
    mandataires(where: { siret: { _eq: $siret } }) {
      siret
    }
  }
`;

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
