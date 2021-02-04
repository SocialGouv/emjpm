import gql from "graphql-tag";

export const SIGNUP_DATA = gql`
  query signup_data {
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
      ville
    }
    services(order_by: { etablissement: asc }) {
      id
      department_id
      etablissement
      code_postal
    }
    role {
      id
      name
    }
  }
`;

export const REGIONS = gql`
  query regions {
    regions(order_by: { nom: asc }) {
      id
      nom
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
