import gql from "graphql-tag";

export const MANDATAIRES = gql`
  {
    users {
      type
      nom
      prenom
      mandataire {
        genre
        adresse
        code_postal
        ville
        telephone_portable
        telephone
        dispo_max
        mesures_en_cours
        mesures_en_attente
      }
    }
  }
`;

export const SERVICES = gql`
  {
    services {
      etablissement
      adresse
      code_postal
      ville
      telephone
      dispo_max
      service_antennes {
        name
        address_street
        address_zip_code
        address_city
        mesures_in_progress
        mesures_awaiting
        mesures_max
      }
    }
  }
`;
