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
  query user_tribunal($id: Int!) {
    user_tis(order_by: { ti: { ville: asc } }, where: { user_id: { _eq: $id } }) {
      id
      ti_id
      user_id
      ti {
        etablissement
        id
      }
    }
  }
`;

export const MANDATAIRE = gql`
  query mandataire($id: Int) {
    mandataires(where: { id: { _eq: $id } }) {
      id
      mesures_en_attente
      mesures_en_cours
    }
  }
`;
