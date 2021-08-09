import gql from "graphql-tag";

export const REOPEN_MESURE = gql`
  mutation reopenMesure(
    $ti: Int!
    $mesure_id: Int!
    $mandataire_id: Int
    $service_id: Int
    $magistrat_id: Int!
    $nature_mesure: nature_mesure_enum!
    $champ_mesure: champ_mesure_enum
    $civilite: civilite_enum!
    $annee_naissance: String!
    $cabinet: String
    $urgent: Boolean!
    $judgmentDate: date
    $antenne_id: Int
  ) {
    insert_mesure_en_attente_reouverture(
      objects: {
        mesure_id: $mesure_id
        is_urgent: $urgent
        judgment_date: $judgmentDate
        cabinet: $cabinet
        ti_id: $ti
        mandataire_id: $mandataire_id
        service_id: $service_id
        antenne_id: $antenne_id
        magistrat_id: $magistrat_id
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        civilite: $civilite
        annee_naissance: $annee_naissance
      }
    ) {
      returning {
        id
        mesure_id
      }
    }
    update_mesures_by_pk(
      pk_columns: { id: $mesure_id }
      _set: { status: en_attente, en_attente_reouverture: true }
    ) {
      id
    }
    reset_mesures_calculations(
      mandataireId: $mandataire_id
      serviceId: $service_id
    ) {
      state
    }
  }
`;

export const CHOOSE_MANDATAIRE = gql`
  mutation chooseMandataire(
    $ti: Int!
    $mandataire_id: Int
    $service_id: Int
    $magistrat_id: Int!
    $nature_mesure: nature_mesure_enum!
    $champ_mesure: champ_mesure_enum
    $civilite: civilite_enum!
    $annee_naissance: String!
    $cabinet: String
    $urgent: Boolean!
    $judgmentDate: date
    $numero_rg: String!
    $antenne_id: Int
  ) {
    insert_mesures(
      objects: {
        is_urgent: $urgent
        judgment_date: $judgmentDate
        cabinet: $cabinet
        ti_id: $ti
        mandataire_id: $mandataire_id
        service_id: $service_id
        antenne_id: $antenne_id
        magistrat_id: $magistrat_id
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        civilite: $civilite
        annee_naissance: $annee_naissance
        numero_rg: $numero_rg
        status: en_attente
      }
    ) {
      returning {
        id
      }
    }
    reset_mesures_calculations(
      mandataireId: $mandataire_id
      serviceId: $service_id
    ) {
      state
    }
  }
`;

export const SEND_EMAIL_RESERVATION = gql`
  mutation email_reservation($mesure_id: Int!) {
    email_reservation(mesure_id: $mesure_id)
  }
`;
