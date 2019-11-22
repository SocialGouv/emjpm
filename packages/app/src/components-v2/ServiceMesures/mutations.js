import gql from "graphql-tag";

export const CLOSE_MESURE = gql`
  mutation closeMesure(
    $id: Int!
    $antenne_id: Int!
    $reason_extinction: String!
    $extinction: date!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        extinction: $extinction
        reason_extinction: $reason_extinction
        status: "Eteindre mesure"
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
    update_service_antenne(where: { id: { _eq: $antenne_id } }, _inc: { mesures_in_progress: -1 }) {
      affected_rows
      returning {
        id
        mesures_in_progress
      }
    }
  }
`;

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $antenne_id: Int!
    $previous_antenne_id: Int!
    $date_ouverture: date
    $type: String
    $residence: String
    $code_postal: String
    $ville: String
    $civilite: String
    $annee: String
    $numero_dossier: String
    $numero_rg: String
    $ti_id: Int!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        date_ouverture: $date_ouverture
        type: $type
        antenne_id: $antenne_id
        residence: $residence
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee: $annee
        ti_id: $ti_id
        numero_dossier: $numero_dossier
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
    updateNewAntenne: update_service_antenne(
      where: { id: { _eq: $antenne_id } }
      _inc: { mesures_in_progress: 1 }
    ) {
      affected_rows
      returning {
        id
        mesures_in_progress
      }
    }
    updatePreviousAntenne: update_service_antenne(
      where: { id: { _eq: $previous_antenne_id } }
      _inc: { mesures_in_progress: -1 }
    ) {
      affected_rows
      returning {
        id
        mesures_in_progress
      }
    }
  }
`;

export const REACTIVATE_MESURE = gql`
  mutation reactivateMesure($id: Int!, $antenne_id: Int!, $reason_extinction: String!) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: { reason_extinction: $reason_extinction, status: "Mesure en cours" }
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
    update_service_antenne(where: { id: { _eq: $antenne_id } }, _inc: { mesures_in_progress: 1 }) {
      affected_rows
      returning {
        id
        mesures_in_progress
      }
    }
  }
`;

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $date_ouverture: date!
    $residence: String!
    $code_postal: String!
    $ville: String!
    $antenne_id: Int!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        antenne_id: $antenne_id
        status: "Mesure en cours"
        date_ouverture: $date_ouverture
        residence: $residence
        code_postal: $code_postal
        ville: $ville
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
    update_service_antenne(
      where: { id: { _eq: $antenne_id } }
      _inc: { mesures_in_progress: 1, mesures_awaiting: -1 }
    ) {
      affected_rows
      returning {
        id
        mesures_in_progress
        mesures_awaiting
      }
    }
  }
`;

export const DELETE_MESURE = gql`
  mutation deleteMesure($id: Int!) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const ADD_MESURE = gql`
  mutation addMesure(
    $date_ouverture: date!
    $type: String!
    $residence: String!
    $code_postal: String!
    $ville: String!
    $civilite: String!
    $annee: String!
    $numero_dossier: String!
    $numero_rg: String!
    $antenne_id: Int!
    $ti_id: Int!
  ) {
    insert_mesures(
      objects: {
        date_ouverture: $date_ouverture
        type: $type
        ti_id: $ti_id
        residence: $residence
        code_postal: $code_postal
        ville: $ville
        civilite: $civilite
        annee: $annee
        numero_dossier: $numero_dossier
        numero_rg: $numero_rg
        status: "Mesure en cours"
        antenne_id: $antenne_id
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
    update_service_antenne(where: { id: { _eq: $antenne_id } }, _inc: { mesures_in_progress: 1 }) {
      affected_rows
      returning {
        id
        mesures_in_progress
      }
    }
  }
`;
