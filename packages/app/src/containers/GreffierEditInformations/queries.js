import gql from "graphql-tag";

export const GREFFIER = gql`
  query users($userId: Int!) {
    users_by_pk(id: $userId) {
      id
      email
      nom
      prenom
      cabinet
      greffier {
        id
        ti_id
        share_email
      }
    }
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
      ville
    }
  }
`;
