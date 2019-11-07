import gql from "graphql-tag";

export const MAGISTRAT = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      cabinet
      created_at
      email
      magistrat {
        ti {
          siret
          ville
          telephone
          etablissement
          email
          code_postal
        }
        user {
          nom
          prenom
          cabinet
          username
        }
      }
    }
  }
`;
