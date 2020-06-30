import gql from "graphql-tag";

export const LB_USERS = gql`
  query listeBlancheUsers(
    $limit: Int
    $offset: Int
    $type: String
    $departementId: Int
    $departementFinanceur: Boolean
    $nom: String
    $prenom: String
    $siret: String
  ) {
    lb_users_aggregate(
      where: {
        type: { _eq: $type }
        lb_departements: {
          departement_id: { _eq: $departementId }
          departement_financeur: { _eq: $departementFinanceur }
        }
        nom: { _ilike: $nom }
        prenom: { _ilike: $prenom }
        siret: { _ilike: $siret }
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
          departement_financeur: { _eq: $departementFinanceur }
        }
        nom: { _ilike: $nom }
        prenom: { _ilike: $prenom }
        siret: { _ilike: $siret }
      }
      order_by: { nom: asc_nulls_last }
    ) {
      id
      nom
      prenom
      email
      siret
      type
      mandataire {
        id
        user_id
      }
      lb_departements {
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
