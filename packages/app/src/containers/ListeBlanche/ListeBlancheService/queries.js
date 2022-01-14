import gql from "graphql-tag";

export const SERVICE = gql`
  query listeBlancheService($listeBlancheId: Int!) {
    liste_blanche_by_pk(id: $listeBlancheId) {
      id
      etablissement
      siret
      code_postal
      ville
      org_gestionnaire
      org_nom
      org_adresse
      org_code_postal
      org_ville
      service {
        departements {
          departement {
            id
          }
        }
        service_members {
          user {
            id
            nom
            prenom
          }
        }
        id
        etablissement
        siret
        ville
        code_postal
        genre
        nom
        prenom
        adresse
        email
        telephone
      }
      genre
      nom
      prenom
      adresse
      email
      telephone
    }
  }
`;

export const CITY_DEPARTEMENT = gql`
  query city_departement($city: String!) {
    geolocalisation_code_postal(where: { cities: { _eq: $city } }) {
      departement_code
    }
  }
`;
