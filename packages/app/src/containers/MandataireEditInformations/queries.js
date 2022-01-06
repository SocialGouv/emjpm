import gql from "graphql-tag";

export const MANDATAIRE = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      email
      nom
      prenom
      type
      mandataire {
        id
        adresse
        location_adresse
        location_code_postal
        location_ville
        latitude
        longitude
        departement_code
        dispo_max
        genre
        telephone
        telephone_portable
        competences
        suspend_activity
        suspend_activity_reason
        mesures_en_cours
        siret
        liste_blanche {
          id
          mandataire_individuel_departements {
            id
            departement_code
            tis(where: { immutable: { _eq: true } }) {
              id
              etablissement
            }
          }
          siret
          mandataire_prepose_etablissements {
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
