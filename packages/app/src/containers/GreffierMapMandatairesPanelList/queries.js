import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query view_lb_tis(
    $limit: Int!
    $tiId: Int!
    $offset: Int!
    $order: order_by
    $departementCode: String
  ) {
    count: search_ti_view_lb_tis_aggregate(
      args: { search: null, tiid: $tiId, departementcode: $departementCode }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: search_ti_view_lb_tis(
      limit: $limit
      offset: $offset
      order_by: { gestionnaire: { remaining_capacity: $order } }
      args: { search: null, tiid: $tiId, departementcode: $departementCode }
    ) {
      gestionnaires(distinct_on: [id]) {
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
          telephone
          latitude
          longitude
          adresse
          code_postal
          ville
          commentaires {
            id
            comment
            ti_id
          }
          user {
            id
            nom
            prenom
            email
            genre
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
          adresse
          ville
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
