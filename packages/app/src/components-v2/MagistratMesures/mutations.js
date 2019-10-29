import gql from "graphql-tag";

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $type: String
    $residence: String
    $code_postal: String
    $ville: String
    $civilite: String
    $annee: String
    $numero_rg: String
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        type: $type
        residence: $residence
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee: $annee
        numero_rg: $numero_rg
      }
    ) {
      returning {
        antenne_id
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
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;

export const DELETE_MANDATAIRE_MESURE = gql`
  mutation deleteMesure($id: Int!, $mandataire_id: Int) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_mandataires(where: { id: { _eq: $mandataire_id } }, _inc: { mesures_en_attente: -1 }) {
      affected_rows
      returning {
        id
        mesures_en_attente
      }
    }
  }
`;

export const DELETE_ANTENNE_MESURE = gql`
  mutation deleteMesure($id: Int!, $antenne_id: Int) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_service_antenne(where: { id: { _eq: $antenne_id } }, _inc: { mesures_awaiting: -1 }) {
      affected_rows
      returning {
        id
        mesures_awaiting
      }
    }
  }
`;
