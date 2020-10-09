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
  query ServiceTribunal {
    service_tis(order_by: { ti: { ville: asc } }) {
      id
      ti {
        etablissement
        id
      }
    }
  }
`;
