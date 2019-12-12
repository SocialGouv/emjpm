import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query view_mesure_gestionnaire($limit: Int!, $tiId: Int!, $offset: Int!, $order: order_by) {
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
          latitude
          longitude
          adresse
          commentaires {
            comment
            ti_id
          }
          code_postal
          user {
            nom
            prenom
            email
            last_login
          }
          genre
          id
        }
        gestionnaire_tis {
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
          service_admins {
            user {
              last_login
            }
          }
        }
      }
    }
  }
`;

export const MESURES_SERVICE = gql`
  query MesureGestionnaire($id: Int!) {
    mesures(where: { service_antenne: { service_id: { _eq: $id } } }) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;

export const MESURES_MANDATAIRE = gql`
  query MesureGestionnaire($id: Int!) {
    mesures(where: { mandataire_id: { _eq: $id } }) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
