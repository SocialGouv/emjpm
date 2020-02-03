import gql from "graphql-tag";

export const DEPARTEMENTS = gql`
  {
    departements {
      id
      code
      nom
    }
  }
`;

export const SERVICE_TRIBUNAL = gql`
  query ServiceTribunal($serviceId: Int!) {
    service_tis(where: { service_id: { _eq: $serviceId } }) {
      ti {
        etablissement
        id
      }
    }
  }
`;
