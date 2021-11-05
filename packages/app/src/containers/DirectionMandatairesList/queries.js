import gql from "graphql-tag";

export const GET_MANDATAIRES = gql`
  query viewMesureGestionnaireByDepartement(
    $offset: Int!
    $limit: Int!
    $departement: String
    $region: Int
    $discriminator: String
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: $discriminator }
        departement: { id_region: { _eq: $region }, id: { _eq: $departement } }
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
        departement: { id_region: { _eq: $region }, id: { _eq: $departement } }
      }
      order_by: { remaining_capacity: $order }
      distinct_on: [id]
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
