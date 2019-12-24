import gql from "graphql-tag";

export const GESTIONNAIRES = gql`
  query view_mesure_gestionnaire($mandataire_id: Int, $service_id: Int) {
    gestionnaires: view_mesure_gestionnaire(
      where: { mandataire_id: { _eq: $mandataire_id }, service_id: { _eq: $service_id } }
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
        tis {
          id
          etablissement
        }
      }
      service {
        id
        nom
        prenom
        ville
        adresse
        code_postal
        telephone
        email
        latitude
        longitude
        etablissement
        service_admins {
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

export const MANDATAIRE_COMMENTS = gql`
  query MandataireComments($service_id: Int, $mandataire_id: Int) {
    commentaires(
      where: { service_id: { _eq: $service_id }, mandataire_id: { _eq: $mandataire_id } }
    ) {
      comment
      service_id
      created_at
      id
      mandataire_id
      ti_id
    }
  }
`;

export const SERVICE_ANTENNES = gql`
  query ServiceAntennes($serviceId: Int) {
    service_antenne(where: { service_id: { _eq: $serviceId } }) {
      contact_email
      contact_firstname
      contact_lastname
      contact_phone
      mesures_awaiting
      mesures_max
      mesures_in_progress
      name
      id
      address_zip_code
      address_street
      address_city
    }
  }
`;
