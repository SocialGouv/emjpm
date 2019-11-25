import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser($prenom: String!, $nom: String!, $email: String!, $id: Int!) {
    __typename
    update_users(_set: { prenom: $prenom, nom: $nom, email: $email }, where: { id: { _eq: $id } }) {
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
