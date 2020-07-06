const { gql } = require("apollo-boost");

module.exports = {
  UPDATE_LB_USER: gql`
    mutation update_lb_users(
      $id: Int!
      $nom: String
      $prenom: String
      $email: String
      $siret: String
    ) {
      update_lb_users_by_pk(
        pk_columns: { id: $id }
        _set: { email: $email, nom: $nom, prenom: $prenom, siret: $siret }
      ) {
        id
        email
        nom
        prenom
        siret
      }
    }
  `,
  CREATE_LB_DEPARTEMENT: gql`
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
  `,
  UPDATE_LB_DEPARTEMENT: gql`
    mutation update_lb_departement($id: Int!, $departement_financeur: Boolean) {
      update_lb_departements(
        where: { id: { _eq: $id } }
        _set: { departement_financeur: $departement_financeur }
      ) {
        affected_rows
      }
    }
  `,
  DELETE_LB_DEPARTEMENT: gql`
    mutation delete_lb_departement($id: Int!) {
      delete_lb_departements_by_pk(id: $id) {
        id
      }
    }
  `,
};
