import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
  ) {
    update_users(
      _set: { prenom: $prenom, nom: $nom, email: $email }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        email
        id
        nom
        prenom
      }
    }
  }
`;

export const EDIT_USER_AND_QRCODE = gql`
  mutation EditUserAndQrCode(
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
    $secret_2fa: String!
  ) {
    update_users(
      _set: {
        prenom: $prenom
        nom: $nom
        email: $email
        secret_2fa: $secret_2fa
      }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        email
        id
        nom
        prenom
      }
    }
  }
`;
