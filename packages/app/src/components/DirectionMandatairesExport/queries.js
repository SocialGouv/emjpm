import gql from "graphql-tag";

export const MANDATAIRES = gql`
  query all($department: Int, $region: Int) {
    mandataires: users(
      where: {
        mandataire: {
          departement: {
            _or: { id: { _eq: $department }, id_region: { _eq: $region } }
          }
        }
      }
    ) {
      id
      type
      nom
      prenom
      mandataire {
        id
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
      where: {
        departement: {
          _or: { id: { _eq: $department }, id_region: { _eq: $region } }
        }
      }
    ) {
      id
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
        id
        name
        adresse
        code_postal
        ville
        mesures_in_progress
        mesures_awaiting
        mesures_max
      }
    }
  }
`;
