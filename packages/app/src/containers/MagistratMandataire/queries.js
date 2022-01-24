import gql from "graphql-tag";

export const GESTIONNAIRES = gql`
  query view_mesure_gestionnaire($mandataire_id: Int, $service_id: Int) {
    gestionnaires: view_mesure_gestionnaire(
      where: {
        mandataire_id: { _eq: $mandataire_id }
        service_id: { _eq: $service_id }
      }
    ) {
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
        adresse_complement
        use_location_adresse
        location_adresse
        ville
        code_postal
        competences
        suspend_activity
        suspend_activity_reason
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
        tis {
          id
          etablissement
        }
      }
      service {
        id
        nom
        prenom
        adresse
        adresse_complement
        code_postal
        ville
        use_location_adresse
        location_adresse
        competences
        telephone
        email
        latitude
        longitude
        etablissement
        suspend_activity
        suspend_activity_reason
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
`;
