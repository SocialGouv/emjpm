import gql from "graphql-tag";

export const ENQUETE_PREPOSE_PRESTATIONS_SOCIALES = gql`
  query enquete_reponses_prestations_sociales($id: Int!) {
    enquete_reponses_prepose_prestations_sociales_by_pk(id: $id) {
      aah
      als_apl
      apa
      asi
      aspa
      created_at
      curatelle_renforcee
      curatelle_simple
      id
      last_update
      maj
      pch
      rsa
      sauvegarde_autres_mesures
      tutelle
    }
  }
`;
