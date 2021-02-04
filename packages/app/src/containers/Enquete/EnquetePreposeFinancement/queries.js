import gql from "graphql-tag";

export const ENQUETE_REPONSES_FINANCEMENT = gql`
  query enquete_reponses_financement($id: Int!) {
    enquete_reponses_financement_by_pk(id: $id) {
      aide_sociale_conseil_departemental
      autre_produits
      charges_fonctionnement
      charges_personnel
      charges_preposes
      created_at
      financement_public
      id
      last_update
      produits_bareme_prelevements
    }
  }
`;
