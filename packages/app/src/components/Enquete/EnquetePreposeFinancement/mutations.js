import gql from "graphql-tag";

export const UPDATE_ENQUETE_REPONSES_FINANCEMENT = gql`
  mutation update_enquete_reponses_financement(
    $id: Int!
    $aide_sociale_conseil_departemental: Float
    $autre_produits: Float
    $charges_fonctionnement: Float
    $charges_personnel: Float
    $charges_preposes: Float
    $financement_public: Float
    $produits_bareme_prelevements: Float
  ) {
    update_enquete_reponses_financement_by_pk(
      pk_columns: { id: $id }
      _set: {
        aide_sociale_conseil_departemental: $aide_sociale_conseil_departemental
        autre_produits: $autre_produits
        charges_fonctionnement: $charges_fonctionnement
        charges_personnel: $charges_personnel
        charges_preposes: $charges_preposes
        financement_public: $financement_public
        produits_bareme_prelevements: $produits_bareme_prelevements
      }
    ) {
      id
      aide_sociale_conseil_departemental
      autre_produits
      charges_fonctionnement
      charges_personnel
      charges_preposes
      created_at
      financement_public
      last_update
      produits_bareme_prelevements
    }
  }
`;
