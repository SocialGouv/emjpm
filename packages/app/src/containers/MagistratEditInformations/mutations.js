import gql from "graphql-tag";

export const EDIT_USER = gql`
  mutation EditUser(
    $cabinet: String
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
    $tiId: Int!
  ) {
    update_users(
      _set: { cabinet: $cabinet, prenom: $prenom, nom: $nom, email: $email }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        cabinet
        email
        id
        nom
        prenom
      }
    }
    update_magistrat(_set: { ti_id: $tiId }, where: { user_id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        ti_id
      }
    }
  }
`;
