import gql from "graphql-tag";

export const ENQUETE_PREPOSE_INFORMATIONS = gql`
  query enquete_prepose_informations($id: Int!) {
    enquete_reponses_modalites_exercice_by_pk(id: $id) {
      actions_information_tuteurs_familiaux
      activite_personne_physique
      activite_service
      created_at
      departement
      etablissement_convention_groupement
      etablissement_personne_morale
      id
      last_update
      nombre_etablissements
      nombre_lits_journee_hospitalisation
      personnalite_juridique_etablissement
      raison_sociale
      region
      total_mesures_etablissements
    }
  }
`;
