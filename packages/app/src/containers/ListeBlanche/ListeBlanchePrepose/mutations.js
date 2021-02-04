import gql from "graphql-tag";

export const UPDATE_LB_USER_PREPOSE = gql`
  mutation update_liste_blanche_prepose(
    $id: Int!
    $data: lb_users_set_input = {}
    $etablissements: [lb_user_etablissements_insert_input!]! = {}
  ) {
    delete_lb_user_etablissements(where: { lb_user_id: { _eq: $id } }) {
      affected_rows
    }
    insert_lb_user_etablissements(objects: $etablissements) {
      affected_rows
      returning {
        id
        etablissement {
          id
          rslongue
          ligneacheminement
        }
        lb_user_id
        etablissement_id
        etablissement_rattachement
      }
    }
    update_lb_users_by_pk(pk_columns: { id: $id }, _set: $data) {
      id
      created_at
      email
      lb_user_etablissements {
        id
        etablissement_id
        lb_user_id
        etablissement {
          id
          rslongue
          ligneacheminement
        }
      }
      nom
      prenom
      siret
    }
  }
`;

export const CREATE_LB_USER_PREPOSE = gql`
  mutation create_liste_blanche_prepose(
    $email: String!
    $nom: String!
    $prenom: String!
    $etablissements: [lb_user_etablissements_insert_input!]! = {}
  ) {
    insert_lb_users_one(
      object: {
        email: $email
        nom: $nom
        prenom: $prenom
        lb_user_etablissements: { data: $etablissements }
        type: "prepose"
      }
    ) {
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
