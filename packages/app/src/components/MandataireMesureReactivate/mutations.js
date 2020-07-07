import gql from "graphql-tag";

export const REACTIVATE_MESURE = gql`
  mutation reactivateMesure($id: Int!, $reason_extinction: String!) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: { reason_extinction: $reason_extinction, status: "Mesure en cours" }
    ) {
      returning {
        id
        cabinet
        civilite
        code_postal
        departement {
          id
          nom
          region {
            id
            nom
          }
        }
        status
        type
        ville
        lieu_vie
        numero_rg
        numero_dossier
        mandataire_id
        etablissement
        annee_naissance
        date_ouverture
      }
    }
  }
`;

export const MANDATAIRE = gql`
  query mandataire($id: Int) {
    mandataires(where: { id: { _eq: $id } }) {
      id
      mesures_en_attente
      mesures_en_cours
    }
  }
`;

export const RECALCULATE_MANDATAIRE_MESURES = gql`
  mutation update_mandataire_mesures($mandataire_id: Int!) {
    recalculateMandataireMesuresCount(mandataireId: $mandataire_id) {
      success
      updatedRows
    }
  }
`;
