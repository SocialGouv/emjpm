import gql from "graphql-tag";

export const GET_SERVICES = gql`
  query Service($serviceId: Int!) {
    services_by_pk(id: $serviceId) {
      mesures_in_progress
      mesures_awaiting
      id
      ville
      code_postal
      adresse
      latitude
      longitude
      email
      etablissement
      dispo_max
      telephone
      prenom
      nom
      competences
      created_at
      departement {
        id
        tis(where: { immutable: { _eq: true } }) {
          id
          etablissement
        }
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
