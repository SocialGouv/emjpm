import gql from "graphql-tag";

export const MANDATAIRES = gql`
  query all($department: Int, $region: Int) {
    mandataires: users(
      where: {
        mandataire: {
          departement: { _or: { id: { _eq: $department }, id_region: { _eq: $region } } }
        }
      }
    ) {
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
    services: services(
      where: { departement: { _or: { id: { _eq: $department }, id_region: { _eq: $region } } } }
    ) {
      etablissement
      adresse
      code_postal
      ville
      telephone
      dispo_max
      email
      nom
      prenom
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
