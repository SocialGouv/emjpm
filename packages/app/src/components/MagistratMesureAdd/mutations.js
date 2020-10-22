import gql from "graphql-tag";

export const CHOOSE_MANDATAIRE = gql`
  mutation chooseMandataire(
    $ti: Int!
    $mandataire_id: Int!
    $magistrat_id: Int!
    $nature_mesure: nature_mesure_type!
    $champ_mesure: champ_mesure_type
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
        champ_mesure: $champ_mesure
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

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataire_id: Int, $service_id: Int) {
    calculate_mesures(mandataireId: $mandataire_id, serviceId: $service_id) {
      success
      updatedRows
    }
  }
`;
export const SEND_EMAIL_RESERVATION = gql`
  mutation email_reservation($mesure_id: Int!) {
    email_reservation(mesure_id: $mesure_id)
  }
`;

export const CHOOSE_SERVICE = gql`
  mutation chooseService(
    $ti: Int!
    $service_id: Int!
    $magistrat_id: Int!
    $nature_mesure: nature_mesure_type!
    $champ_mesure: champ_mesure_type
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
        champ_mesure: $champ_mesure
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
