import gql from "graphql-tag";

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $type: String
    $civilite: String
    $annee_naissance: String
    $numero_rg: String
    $cabinet: String
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        type: $type
        civilite: $civilite
        annee_naissance: $annee_naissance
        numero_rg: $numero_rg
        cabinet: $cabinet
      }
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
        etablissement
        annee_naissance
        date_ouverture
        pays
      }
    }
  }
`;

export const DELETE_MANDATAIRE_MESURE = gql`
  mutation deleteMesure($id: Int!, $mandataire_id: Int) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_mandataires(where: { id: { _eq: $mandataire_id } }) {
      affected_rows
      returning {
        id
        mesures_en_attente
      }
    }
  }
`;

export const DELETE_SERVICE_MESURE = gql`
  mutation deleteMesure($id: Int!, $service_id: Int!) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
    update_services(where: { id: { _eq: $service_id } }) {
      affected_rows
      returning {
        id
        mesures_awaiting
      }
    }
  }
`;
