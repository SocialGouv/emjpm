import gql from "graphql-tag";

export const REACTIVATE_MESURE = gql`
  mutation reactivateMesure($id: Int!, $mandataireId: Int, $serviceId: Int) {
    reset_mesures_calculations(
      mandataireId: $mandataireId
      serviceId: $serviceId
    ) {
      state
    }
    update_mesures(where: { id: { _eq: $id } }, _set: { status: en_cours }) {
      returning {
        id
        cabinet
        civilite
        code_postal
        departement {
          id
          nom
          region {
            id
            nom
          }
        }
        status
        nature_mesure
        champ_mesure
        ville
        lieu_vie
        numero_rg
        numero_dossier
        mandataire_id
        annee_naissance
        date_nomination
      }
    }
    mesures_last_update {
      status
    }
  }
`;
