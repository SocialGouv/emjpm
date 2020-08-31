import gql from "graphql-tag";

export const CREATE_LB_USER_SERVICE = gql`
  mutation create_liste_blanche_service($email: String!, $nom: String!, $siret: String!) {
    insert_lb_users_one(object: { email: $email, nom: $nom, type: "service", siret: $siret }) {
      email
      created_at
      id
      nom
      prenom
      siret
      lb_user_etablissements {
        etablissement_id
        etablissement_rattachement
        id
        lb_user_id
      }
    }
  }
`;
