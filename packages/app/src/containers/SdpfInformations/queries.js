import gql from "graphql-tag";

export const GET_SDPF = gql`
  query SDPF {
    sdpf {
      id
      ville
      code_postal
      adresse
      location_adresse
      siret
      email
      etablissement
      telephone
      prenom
      nom
      created_at
      org_gestionnaire
      org_nom
      org_adresse
      org_code_postal
      org_ville
      suspend_activity
      suspend_activity_reason
      departement
    }
  }
`;
