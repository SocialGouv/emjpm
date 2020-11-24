import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($userId: Int!) {
    mandataires(where: { user_id: { _eq: $userId } }) {
      mesures_en_attente
      mesures_en_cours
      id
    }
    mesures(where: { mandataire: { user_id: { _eq: $userId } } }) {
      id
      annee_naissance
      nature_mesure
      champ_mesure
      numero_dossier
      lieu_vie
      numero_rg
      status
      date_nomination
      code_postal
      ville
      created_at
      ti {
        id
        etablissement
        ville
      }
    }
  }
`;

export const MANDATAIRE_TIS = gql`
  query admin_mandataire_tis($userId: Int!) {
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
    }
    mandataires(limit: 1, where: { user_id: { _eq: $userId } }) {
      id
    }
    mandataire_tis(where: { mandataire: { user_id: { _eq: $userId } } }) {
      id
      ti {
        id
        etablissement
        code_postal
      }
    }
  }
`;
