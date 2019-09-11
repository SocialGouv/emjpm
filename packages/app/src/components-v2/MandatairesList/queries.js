import gql from "graphql-tag";

export const GET_MANDATAIRES = gql`
  query view_mesure_gestionnaire(
    $offset: Int!
    $departement: Int
    $region: Int
    $discriminator: String
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_aggregate(
      where: {
        discriminator: { _eq: $discriminator }
        departement: { id_region: { _eq: $region }, id: { _eq: $departement } }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire(
      limit: 10
      offset: $offset
      where: {
        discriminator: { _eq: $discriminator }
        departement: { id_region: { _eq: $region }, id: { _eq: $departement } }
      }
      order_by: { remaining_capacity: $order }
    ) {
      discriminator
      mesures_awaiting
      mesures_in_progress
      mesures_max
      mandataire_id
      remaining_capacity
      service_id
      mandataire {
        telephone
        ville
        user {
          nom
          prenom
          email
        }
        genre
        id
      }
      service {
        id
        nom
        prenom
        ville
        telephone
        email
      }
    }
  }
`;
