import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query view_lb_tis(
    $limit: Int!
    $tiId: Int!
    $offset: Int!
    $order: order_by
    $departementCode: String
  ) {
    count: view_lb_tis_aggregate(
      where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: search_ti_view_lb_tis(
      limit: $limit
      offset: $offset
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
          genre
          telephone
          latitude
          longitude
          adresse
          location_adresse
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
          location_adresse
          code_postal
          ville
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
