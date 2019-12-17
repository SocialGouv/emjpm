import gql from "graphql-tag";

export const MANDATAIRE = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      email
      id
      nom
      prenom
      mandataire {
        adresse
        code_postal
        dispo_max
        etablissement
        genre
        id
        nb_secretariat
        secretariat
        siret
        telephone
        telephone_portable
        ville
      }
    }
  }
`;
