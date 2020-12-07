import gql from "graphql-tag";

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $antenne_id: Int
    $date_nomination: date!
    $date_protection_en_cours: date!
    $date_premier_mesure: date
    $civilite: civilite_enum
    $annee_naissance: String
    $numero_dossier: String
    $numero_rg: String
    $ti_id: Int!
    $cabinet: String
  ) {
    add_or_update: update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        date_nomination: $date_nomination
        date_protection_en_cours: $date_protection_en_cours
        date_premier_mesure: $date_premier_mesure
        antenne_id: $antenne_id
        civilite: $civilite
        annee_naissance: $annee_naissance
        ti_id: $ti_id
        numero_dossier: $numero_dossier
        numero_rg: $numero_rg
        cabinet: $cabinet
      }
    ) {
      returning {
        id
      }
    }
  }
`;
