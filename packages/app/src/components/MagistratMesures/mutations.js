import gql from "graphql-tag";

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $nature_mesure: nature_mesure_type
    $champ_mesure: champ_mesure_type
    $civilite: civilite_type
    $annee_naissance: String
    $numero_rg: String
    $cabinet: String
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
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
        nature_mesure
        champ_mesure
        ville
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee_naissance
        date_nomination
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
