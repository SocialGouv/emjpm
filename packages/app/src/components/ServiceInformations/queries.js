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
      siret
      email
      etablissement
      dispo_max
      telephone
      prenom
      nom
      competences
      created_at
      lb_adresse
      lb_code_postal
      lb_ville
      org_gestionnaire
      org_nom
      org_adresse
      org_code_postal
      org_ville
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
