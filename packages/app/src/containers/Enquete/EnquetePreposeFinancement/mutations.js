import gql from "graphql-tag";

export const UPDATE_ENQUETE_REPONSES_FINANCEMENT = gql`
  mutation update_enquete_reponses_financement(
    $id: Int!
    $aide_sociale_conseil_departemental: numeric
    $autre_produits: numeric
    $charges_fonctionnement: numeric
    $charges_personnel: numeric
    $charges_preposes: numeric
    $financement_public: numeric
    $produits_bareme_prelevements: numeric
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
