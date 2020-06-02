import gql from "graphql-tag";

export const LB_USERS = gql`
  query listeBlancheUsers(
    $limit: Int
    $offset: Int
    $type: String
    $departementId: Int
    $searchText: String
  ) {
    lb_users_aggregate(
      where: {
        type: { _eq: $type }
        lb_departements: {
          departement_id: { _eq: $departementId }
          departement_financeur: { _eq: true }
        }
        nom: { _ilike: $searchText }
      }
    ) {
      aggregate {
        count
      }
    }
    lb_users(
      limit: $limit
      offset: $offset
      where: {
        type: { _eq: $type }
        lb_departements: {
          departement_id: { _eq: $departementId }
          departement_financeur: { _eq: true }
        }
        nom: { _ilike: $searchText }
      }
      order_by: { nom: asc_nulls_last }
    ) {
      id
      nom
      prenom
      email
      siret
      type
      user_id
      lb_departements(
        where: { departement_id: { _eq: $departementId }, departement_financeur: { _eq: true } }
      ) {
        id
        departement_financeur
        ti
        service
        prepose
        individuel
        departement {
          code
          nom
        }
      }
    }
  }
`;
