import gql from "graphql-tag";

export const MAGISTRAT = gql`
  {
    users {
      id
      cabinet
      created_at
      email
      magistrat {
        ti {
          ville
          telephone
          etablissement
          email
          code_postal
        }
        user {
          nom
          prenom
          username
        }
      }
    }
  }
`;
