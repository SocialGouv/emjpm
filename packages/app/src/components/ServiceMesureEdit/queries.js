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
    service_tis(order_by: { ti: { ville: asc } }, where: { service_id: { _eq: $serviceId } }) {
      id
      ti {
        etablissement
        id
      }
    }
  }
`;
