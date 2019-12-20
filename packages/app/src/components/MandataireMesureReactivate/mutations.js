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
          nom
          region {
            nom
          }
        }
        status
        type
        ville
        residence
        numero_rg
        numero_dossier
        mandataire_id
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;

export const UPDATE_MANDATAIRES_COUTERS = gql`
  mutation UpdateMandatairesCounter(
    $mesures_in_progress: Int!
    $mandataireId: Int!
    $mesures_awaiting: Int!
  ) {
    update_mandataires(
      where: { id: { _eq: $mandataireId } }
      _inc: { mesures_en_cours: $mesures_in_progress, mesures_en_attente: $mesures_awaiting }
    ) {
      affected_rows
      returning {
        id
        mesures_en_cours
        mesures_en_attente
      }
    }
  }
`;
