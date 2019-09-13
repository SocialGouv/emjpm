import gql from "graphql-tag";

export const UPDATE_MESURE = gql`
  mutation UpdateMesure($id: Int!, $reason_extinction: String!, $extinction: date!) {
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
  }
`;
