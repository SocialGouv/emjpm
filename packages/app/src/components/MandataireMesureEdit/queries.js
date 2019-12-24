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

export const USER_TRIBUNAL = gql`
  query UserTribunal {
    user_tis {
      id
      ti_id
      user_id
      ti {
        id
        etablissement
      }
    }
  }
`;
