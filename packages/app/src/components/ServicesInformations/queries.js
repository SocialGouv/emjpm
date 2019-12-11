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
      email
      etablissement
      dispo_max
      telephone
      prenom
      nom
      information
      created_at
      service_tis {
        ti {
          etablissement
          id
        }
      }
    }
  }
`;
