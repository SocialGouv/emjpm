import gql from "graphql-tag";

export const CURRENT_USER = gql`
  {
    currentUser @client {
      magistrat {
        ti_id
      }
    }
  }
`;

export const GET_MANDATAIRES = gql`
  query view_mesure_gestionnaire(
    $tribunal: Int!
    $offset: Int!
    $discriminator: String
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_aggregate(
      where: {
        gestionnaire_tis: { ti_id: { _eq: $tribunal } }
        discriminator: { _eq: $discriminator }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire_tis(
      limit: 10
      offset: $offset
      order_by: { gestionnaire: { remaining_capacity: $order } }
      where: { discriminator: { _eq: $discriminator }, ti_id: { _eq: $tribunal } }
    ) {
      gestionnaire {
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
  }
`;
