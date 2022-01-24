import gql from "graphql-tag";

export const GET_SERVICES = gql`
  query Service {
    services {
      mesures_in_progress
      mesures_awaiting
      id
      ville
      code_postal
      adresse
      location_adresse
      use_location_adresse
      siret
      email
      etablissement
      dispo_max
      telephone
      prenom
      nom
      competences
      created_at
      org_gestionnaire
      org_nom
      org_adresse
      org_code_postal
      org_ville
      suspend_activity
      suspend_activity_reason
      service_departements {
        departement_code
      }
      service_tis {
        id
        ti {
          etablissement
          id
        }
      }
    }
  }
`;
