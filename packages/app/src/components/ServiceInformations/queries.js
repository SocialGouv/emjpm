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
