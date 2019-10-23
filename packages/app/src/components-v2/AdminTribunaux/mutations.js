import gql from "graphql-tag";

export const ADD_TRIBUNAL = gql`
  mutation addTribunal(
    $etablissement: String!
    $code_postal: String!
    $ville: String!
    $email: String!
    $telephone: String!
  ) {
    insert_tis(
      objects: {
        etablissement: $etablissement
        code_postal: $code_postal
        ville: $ville
        email: $email
        telephone: $telephone
      }
    ) {
      returning {
        id
        etablissement
        code_postal
        ville
        telephone
        email
      }
    }
  }
`;
