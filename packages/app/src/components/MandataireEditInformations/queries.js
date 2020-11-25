import gql from "graphql-tag";

export const MANDATAIRE = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      email
      nom
      prenom
      mandataire {
        id
        adresse
        code_postal
        latitude
        longitude
        dispo_max
        genre
        siret
        telephone
        telephone_portable
        ville
        competences
        lb_user {
          id
          lb_departements {
            id
            tis(where: { immutable: { _eq: true } }) {
              id
              etablissement
            }
          }
        }
        mandataire_tis {
          id
          ti_id
        }
      }
    }
  }
`;
