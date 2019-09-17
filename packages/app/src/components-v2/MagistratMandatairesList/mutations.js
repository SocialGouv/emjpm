import gql from "graphql-tag";

export const CHOOSE_MANDATAIRE = gql`
  mutation chooseMandataire($type: String, $civilite: String, $annee: String, $numero_rg: String) {
    create_mesures(
      _set: {
        type: $type
        civilite: $civilite
        annee: $annee
        numero_dossier: $numero_dossier
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
        residence
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;
