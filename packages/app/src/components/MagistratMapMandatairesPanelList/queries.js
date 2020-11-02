import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query view_mesure_gestionnaire(
    $limit: Int!
    $tiId: Int!
    $offset: Int!
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_aggregate(
      where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire_tis(
      limit: $limit
      offset: $offset
      order_by: { gestionnaire: { remaining_capacity: $order } }
      where: { ti_id: { _eq: $tiId } }
    ) {
      gestionnaire {
        id
        discriminator
        mesures_awaiting
        mesures_in_progress
        mesures_max
        mandataire_id
        remaining_capacity
        service_id
        mandataire {
          id
          genre
          telephone
          ville
          latitude
          longitude
          adresse
          commentaires {
            id
            comment
            ti_id
          }
          code_postal
          user {
            id
            nom
            prenom
            email
            last_login
          }
        }
        gestionnaire_tis {
          id
          tis {
            id
            etablissement
          }
        }
        service {
          id
          nom
          prenom
          latitude
          longitude
          ville
          adresse
          code_postal
          telephone
          email
          etablissement
          service_members {
            id
            user {
              id
              last_login
            }
          }
        }
      }
    }
  }
`;
