import gql from "graphql-tag";

export const CHOOSE_MANDATAIRE = gql`
  mutation chooseMandataire(
    $ti: Int!
    $mandataire_id: Int!
    $type: String!
    $civilite: String!
    $annee: String!
    $numero_rg: String!
  ) {
    insert_mesures(
      objects: {
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
        ti_id
        residence
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
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
    $antenne_id: Int!
    $type: String!
    $civilite: String!
    $annee: String!
    $numero_rg: String!
  ) {
    insert_mesures(
      objects: {
        ti_id: $ti
        antenne_id: $antenne_id
        type: $type
        civilite: $civilite
        annee: $annee
        numero_rg: $numero_rg
        status: "Mesure en attente"
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
        ti_id
        residence
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
    update_service_antenne(where: { id: { _eq: $antenne_id } }, _inc: { mesures_awaiting: 1 }) {
      affected_rows
      returning {
        id
        mesures_awaiting
      }
    }
  }
`;
