import gql from "graphql-tag";

export const ENQUETE_REPONSE_PRESTATIONS_SOCIALES = gql`
  query enquete_reponses_prestations_sociales($id: Int!) {
    enquete_reponses_prestations_sociales(
      where: { enquete_reponses_id: { _eq: $id } }
    ) {
      id
      aah
      pch
      asi
      rsa
      als_apl
      aspa
      apa
      last_update
    }
  }
`;
