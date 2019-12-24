import gql from "graphql-tag";

export const CHOOSE_MANDATAIRE = gql`
  mutation chooseMandataire(
    $ti: Int!
    $mandataire_id: Int!
    $type: String!
    $civilite: String!
    $annee: String!
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
        type: $type
        civilite: $civilite
        annee: $annee
        numero_rg: $numero_rg
        status: "Mesure en attente"
      }
    ) {
      returning {
        id
      }
    }
    update_mandataires(where: { id: { _eq: $mandataire_id } }, _inc: { mesures_en_attente: 1 }) {
      affected_rows
      returning {
        id
        mesures_en_attente
      }
    }
  }
`;

export const CHOOSE_SERVICE = gql`
  mutation chooseService(
    $ti: Int!
    $service_id: Int!
    $type: String!
    $civilite: String!
    $annee: String!
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
        type: $type
        civilite: $civilite
        annee: $annee
        numero_rg: $numero_rg
        judgment_date: $judgmentDate
        status: "Mesure en attente"
      }
    ) {
      returning {
        id
      }
    }
    update_services(where: { id: { _eq: $service_id } }, _inc: { mesures_awaiting: 1 }) {
      affected_rows
      returning {
        id
        mesures_awaiting
      }
    }
  }
`;
