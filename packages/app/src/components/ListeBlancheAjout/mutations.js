import gql from "graphql-tag";

export const CREATE_LB_USER = gql`
  mutation create_lb_user(
    $nom: String = ""
    $prenom: String = ""
    $siret: String = ""
    $email: String = ""
    $departements: [lb_departements_insert_input!]!
  ) {
    insert_lb_users_one(
      object: {
        nom: $nom
        prenom: $prenom
        siret: $siret
        email: $email
        lb_departements: { data: $departements }
      }
    ) {
      created_at
      email
      id
      lb_departements {
        id
        departement_id
      }
      nom
      prenom
      siret
      type
    }
  }
`;
