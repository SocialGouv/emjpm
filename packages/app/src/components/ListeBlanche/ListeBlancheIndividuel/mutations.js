import gql from "graphql-tag";

export const DELETE_LB_DEPARTEMENTS = gql`
  mutation delete_lb_departements($ids: [Int!]!) {
    delete_lb_departements(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }
`;

export const UPDATE_DEPARTEMENT_FINANCEUR = gql`
  mutation set_departement_financeur($id: Int!) {
    update_lb_departements_by_pk(
      pk_columns: { id: $id }
      _set: { departement_financeur: true }
    ) {
      id
      departement_financeur
    }
  }
`;

export const CREATE_LB_USER_INDIVIDUEL = gql`
  mutation create_lb_user(
    $nom: String!
    $prenom: String!
    $siret: String!
    $email: String!
    $adresse1: String!
    $adresse2: String
    $code_postal: String!
    $ville: String!
    $departements: [lb_departements_insert_input!]!
  ) {
    insert_lb_users_one(
      object: {
        nom: $nom
        prenom: $prenom
        siret: $siret
        email: $email
        adresse1: $adresse1
        adresse2: $adresse2
        code_postal: $code_postal
        ville: $ville
        lb_departements: { data: $departements }
        type: "individuel"
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

export const UPDATE_LB_USER = gql`
  mutation update_lb_users(
    $id: Int!
    $nom: String
    $prenom: String
    $email: String
    $siret: String
    $adresse1: String!
    $adresse2: String
    $code_postal: String!
    $ville: String!
    $departementsToDelete: [Int!]
    $departementsToAdd: [lb_departements_insert_input!]!
  ) {
    update_lb_departements(
      _set: { departement_financeur: false }
      where: { lb_user_id: { _eq: $id } }
    ) {
      affected_rows
    }
    delete_lb_departements(where: { id: { _in: $departementsToDelete } }) {
      affected_rows
    }
    insert_lb_departements(objects: $departementsToAdd) {
      affected_rows
    }
    update_lb_users_by_pk(
      pk_columns: { id: $id }
      _set: {
        nom: $nom
        prenom: $prenom
        email: $email
        siret: $siret
        adresse1: $adresse1
        adresse2: $adresse2
        code_postal: $code_postal
        ville: $ville
      }
    ) {
      id
      email
      nom
      prenom
      siret
      created_at
    }
  }
`;

export const CREATE_LB_DEPARTEMENT = gql`
  mutation create_lb_departement(
    $lb_user_id: Int!
    $departement_id: Int!
    $departement_financeur: Boolean
    $individuel: Boolean
    $service: Boolean
    $prepose: Boolean
    $ti: Boolean
  ) {
    insert_lb_departements_one(
      object: {
        lb_user_id: $lb_user_id
        departement_id: $departement_id
        departement_financeur: $departement_financeur
        individuel: $individuel
        service: $service
        prepose: $prepose
        ti: $ti
      }
    ) {
      id
    }
  }
`;

export const UPDATE_LB_DEPARTEMENT = gql`
  mutation update_lb_departement($id: Int!, $departement_financeur: Boolean) {
    update_lb_departements(
      where: { id: { _eq: $id } }
      _set: { departement_financeur: $departement_financeur }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_LB_DEPARTEMENT = gql`
  mutation delete_lb_departement($id: Int!) {
    delete_lb_departements_by_pk(id: $id) {
      id
    }
  }
`;
