import gql from "graphql-tag";

export const SERVICE = gql`
  query listeBlancheService($serviceId: Int!) {
    services_by_pk(id: $serviceId) {
      id
      etablissement
      siret
      code_postal
      ville
      code_postal
      ville
      org_gestionnaire
      org_nom
      org_adresse
      org_code_postal
      org_ville
      departements {
        departement {
          id
        }
      }
      adresse
      adresse
      latitude
      longitude
      email
      telephone
    }
  }
`;
