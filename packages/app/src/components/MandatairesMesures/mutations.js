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

export const EDIT_MESURE = gql`
  mutation EditMesure(
    $id: Int!
    $department_id: Int!
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
        department_id: $department_id
        type: $type
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
        mandataire_id
        date_ouverture
        ti {
          id
          etablissement
        }
      }
    }
  }
`;

export const REACTIVATE_MESURE = gql`
  mutation reactivateMesure($id: Int!, $reason_extinction: String!) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: { reason_extinction: $reason_extinction, status: "Mesure en cours" }
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
        numero_rg
        numero_dossier
        mandataire_id
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int!
    $date_ouverture: date!
    $residence: String!
    $code_postal: String!
    $ville: String!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        department_id: $department_id
        status: "Mesure en cours"
        date_ouverture: $date_ouverture
        residence: $residence
        code_postal: $code_postal
        ville: $ville
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

export const DELETE_MESURE = gql`
  mutation deleteMesure($id: Int!) {
    delete_mesures(where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const ADD_MESURE = gql`
  mutation addMesure(
    $date_ouverture: date!
    $department_id: Int!
    $type: String!
    $residence: String!
    $code_postal: String!
    $ville: String!
    $civilite: String!
    $annee: String!
    $numero_dossier: String!
    $numero_rg: String!
    $ti_id: Int!
    $mandataireId: Int!
  ) {
    insert_mesures(
      objects: {
        department_id: $department_id
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
        mandataire_id: $mandataireId
      }
    ) {
      returning {
        annee
        antenne_id
        cabinet
        civilite
        code_postal
        created_at
        date_ouverture
        department_id
        etablissement
        etablissement_id
        extinction
        id
        is_urgent
        judgment_date
        mandataire_id
        numero_dossier
        numero_rg
        reason_extinction
        residence
        service_id
        status
        ti_id
        type
        ville
        departement {
          nom
          region {
            nom
          }
        }
        ti {
          id
          etablissement
        }
      }
    }
  }
`;
