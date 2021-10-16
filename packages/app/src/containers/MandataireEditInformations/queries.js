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
        telephone
        telephone_portable
        ville
        competences
        suspend_activity
        suspend_activity_reason
        mesures_en_cours
        lb_user {
          id
          lb_departements {
            id
            departement_code
            tis(where: { immutable: { _eq: true } }) {
              id
              etablissement
            }
          }
          siret
          lb_user_etablissements {
            id
            etablissement {
              id
              tis(where: { immutable: { _eq: true } }) {
                id
                etablissement
              }
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
