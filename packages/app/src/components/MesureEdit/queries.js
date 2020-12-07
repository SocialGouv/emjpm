import gql from "graphql-tag";

export const SERVICE_TRIBUNAL = gql`
  query ServiceTribunal {
    tribunaux: service_tis(order_by: { ti: { ville: asc } }) {
      id
      ti {
        etablissement
        id
      }
    }
  }
`;

export const MANDATAIRE_TRIBUNAL = gql`
  query mandataireTribunaux {
    tribunaux: mandataire_tis(order_by: { ti: { ville: asc } }) {
      id
      ti {
        etablissement
        id
      }
    }
  }
`;
