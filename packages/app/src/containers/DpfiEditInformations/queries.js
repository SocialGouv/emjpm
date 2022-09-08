import gql from "graphql-tag";

export const DPFI = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      email
      nom
      prenom
      type
      genre
      dpfi {
        id
        adresse
        adresse_complement
        location_adresse
        code_postal
        ville
        latitude
        longitude
        departement_code
        telephone
        telephone_portable
        suspend_activity
        suspend_activity_reason
        siret
        liste_blanche {
          id
          dpfi_departements {
            id
            departement_code
          }
          siret
        }
      }
    }
  }
`;
