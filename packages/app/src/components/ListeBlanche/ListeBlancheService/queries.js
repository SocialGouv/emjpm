import gql from "graphql-tag";

export const SERVICE = gql`
  query listeBlancheService($serviceId: Int!) {
    services_by_pk(id: $serviceId) {
      id
      etablissement
      siret
      lb_code_postal
      lb_ville
      code_postal
      ville
      org_gestionnaire
      org_nom
      org_adresse
      org_code_postal
      org_ville
      departement {
        id
        code
      }
      adresse
      lb_adresse
      latitude
      longitude
      email
      telephone
    }
  }
`;
