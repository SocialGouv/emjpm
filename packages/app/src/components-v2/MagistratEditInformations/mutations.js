import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $cabinet: String
    $username: String!
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
  ) {
    __typename
    update_users(
      _set: { cabinet: $cabinet, username: $username, prenom: $prenom, nom: $nom, email: $email }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        cabinet
        email
        id
        nom
        prenom
        username
      }
    }
  }
`;
