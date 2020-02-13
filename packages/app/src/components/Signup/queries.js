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

export const SERVICE_MEMBER_INVITATION = gql`
  query service_member_invitation($token: String!) {
    service_member_invitations(where: { token: { _eq: $token } }) {
      id
      email
      service_id
      service {
        etablissement
      }
      token
    }
  }
`;
