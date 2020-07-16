import gql from "graphql-tag";

export const CHOOSE_MANDATAIRE = gql`
  mutation chooseMandataire(
    $ti: Int!
    $mandataire_id: Int!
    $magistrat_id: Int!
    $nature_mesure: nature_mesure_type!
    $champ_protection: champ_protection_type
    $civilite: civilite_type!
    $annee_naissance: String!
    $cabinet: String
    $urgent: Boolean!
    $judgmentDate: date
    $numero_rg: String!
  ) {
    insert_mesures(
      objects: {
        is_urgent: $urgent
        judgment_date: $judgmentDate
        cabinet: $cabinet
        ti_id: $ti
        mandataire_id: $mandataire_id
        magistrat_id: $magistrat_id
        nature_mesure: $nature_mesure
        champ_protection: $champ_protection
        civilite: $civilite
        annee_naissance: $annee_naissance
        numero_rg: $numero_rg
        status: "en_attente"
      }
    ) {
      returning {
        id
      }
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

export const RECALCULATE_SERVICE_MESURES = gql`
  mutation update_service_mesures($service_id: Int!) {
    recalculateServiceMesuresCount(serviceId: $service_id) {
      success
      updatedRows
    }
  }
`;

export const CHOOSE_SERVICE = gql`
  mutation chooseService(
    $ti: Int!
    $service_id: Int!
    $magistrat_id: Int!
    $nature_mesure: nature_mesure_type!
    $champ_protection: champ_protection_type
    $civilite: civilite_type!
    $annee_naissance: String!
    $cabinet: String
    $judgmentDate: date
    $numero_rg: String!
    $urgent: Boolean!
  ) {
    insert_mesures(
      objects: {
        ti_id: $ti
        is_urgent: $urgent
        cabinet: $cabinet
        service_id: $service_id
        magistrat_id: $magistrat_id
        nature_mesure: $nature_mesure
        champ_protection: $champ_protection
        civilite: $civilite
        annee_naissance: $annee_naissance
        numero_rg: $numero_rg
        judgment_date: $judgmentDate
        status: "en_attente"
      }
    ) {
      returning {
        id
      }
    }
  }
`;
