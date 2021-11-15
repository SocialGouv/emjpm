import gql from "graphql-tag";

export const GET_MANDATAIRES_BY_DEPARTEMENT = gql`
  query viewMesureGestionnaireByDepartement(
    $offset: Int!
    $limit: Int!
    $departement: String
    $discriminator: String
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: $discriminator }
        departement: { id: { _eq: $departement } }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire_departement(
      limit: $limit
      offset: $offset
      where: {
        discriminator: { _eq: $discriminator }
        departement: { id: { _eq: $departement } }
      }
      order_by: { remaining_capacity: $order }
    ) {
      id
      discriminator
      mesures_awaiting
      mesures_in_progress
      mesures_max
      mandataire_id
      remaining_capacity
      service_id
      mesures_last_update
      mandataire {
        id
        telephone
        ville
        suspend_activity
        suspend_activity_reason
        user {
          id
          nom
          prenom
          email
        }
        genre
      }
      service {
        id
        etablissement
        nom
        prenom
        ville
        telephone
        email
        suspend_activity
        suspend_activity_reason
        service_antennes_aggregate(
          where: { departement_code: { _eq: $departement } }
        ) {
          aggregate {
            count
            sum {
              mesures_max
              mesures_in_progress: mesures_in_progress_cached
              mesures_awaiting: mesures_awaiting_cached
            }
          }
        }
      }
    }
  }
`;

export const GET_MANDATAIRES_BY_REGION = gql`
  query viewMesureGestionnaireByRegion(
    $offset: Int!
    $limit: Int!
    $region: Int
    $discriminator: String
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_region_aggregate(
      where: {
        discriminator: { _eq: $discriminator }
        id_region: { _eq: $region }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire_region(
      limit: $limit
      offset: $offset
      where: {
        discriminator: { _eq: $discriminator }
        id_region: { _eq: $region }
      }
      order_by: { remaining_capacity: $order }
    ) {
      id
      discriminator
      mesures_awaiting
      mesures_in_progress
      mesures_max
      mandataire_id
      remaining_capacity
      service_id
      mesures_last_update
      mandataire {
        id
        telephone
        ville
        suspend_activity
        suspend_activity_reason
        user {
          id
          nom
          prenom
          email
        }
        genre
      }
      service {
        id
        etablissement
        nom
        prenom
        ville
        telephone
        email
        suspend_activity
        suspend_activity_reason
        service_antennes_aggregate {
          aggregate {
            count
            sum {
              mesures_max
              mesures_in_progress: mesures_in_progress_cached
              mesures_awaiting: mesures_awaiting_cached
            }
          }
        }
      }
    }
  }
`;

export const GET_MANDATAIRES_BY_NATION = gql`
  query viewMesureGestionnaireByRegion(
    $offset: Int!
    $limit: Int!
    $discriminator: String
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_nation_aggregate(
      where: { discriminator: { _eq: $discriminator } }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire_nation(
      limit: $limit
      offset: $offset
      where: { discriminator: { _eq: $discriminator } }
      order_by: { remaining_capacity: $order }
    ) {
      id
      discriminator
      mesures_awaiting
      mesures_in_progress
      mesures_max
      mandataire_id
      remaining_capacity
      service_id
      mesures_last_update
      mandataire {
        id
        telephone
        ville
        suspend_activity
        suspend_activity_reason
        user {
          id
          nom
          prenom
          email
        }
        genre
      }
      service {
        id
        etablissement
        nom
        prenom
        ville
        telephone
        email
        suspend_activity
        suspend_activity_reason
        service_antennes_aggregate {
          aggregate {
            count
            sum {
              mesures_max
              mesures_in_progress: mesures_in_progress_cached
              mesures_awaiting: mesures_awaiting_cached
            }
          }
        }
      }
    }
  }
`;
