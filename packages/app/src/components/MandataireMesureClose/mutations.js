import gql from "graphql-tag";

export const CLOSE_MESURE = gql`
  mutation closeMesure($id: Int!, $reason_extinction: String!, $extinction: date!) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        extinction: $extinction
        reason_extinction: $reason_extinction
        status: "Eteindre mesure"
      }
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
        mandataire_id
        numero_rg
        numero_dossier
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
