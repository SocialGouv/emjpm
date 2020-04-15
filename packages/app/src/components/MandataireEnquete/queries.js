import gql from "graphql-tag";

export const ENQUETE = gql`
  query enquete($id: Int!) {
    enquiries_by_pk(id: $id) {
      created_at
      year
    }
  }
`;

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
        etablissement
        genre
        siret
        telephone
        telephone_portable
        ville
        competences
      }
    }
  }
`;
