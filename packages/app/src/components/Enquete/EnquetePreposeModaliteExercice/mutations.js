import gql from "graphql-tag";

export const UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_ETABLISSEMENTS = gql`
  mutation update_enquete_prepose_modalite_exercice(
    $id: Int!
    $actions_information_tuteurs_familiaux: Boolean!
    $data: jsonb!
  ) {
    update_enquete_reponses_modalites_exercice_by_pk(
      pk_columns: { id: $id }
      _set: {
        actions_information_tuteurs_familiaux: $actions_information_tuteurs_familiaux
        nombre_lits_journee_hospitalisation: $data
      }
    ) {
      id
      nombre_lits_journee_hospitalisation
    }
  }
`;

export const UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_INFORMATIONS = gql`
  mutation update_enquete_prepose_modalite_exercice(
    $id: Int!
    $activite_personne_physique: Int
    $activite_service: Int
    $departement: String
    $etablissement_convention_groupement: Int
    $etablissement_personne_morale: Int
    $nombre_etablissements: Int
    $personnalite_juridique_etablissement: String
    $raison_sociale: String
    $region: String
    $total_mesures_etablissements: Int
  ) {
    update_enquete_reponses_modalites_exercice_by_pk(
      pk_columns: { id: $id }
      _set: {
        activite_personne_physique: $activite_personne_physique
        activite_service: $activite_service
        departement: $departement
        etablissement_convention_groupement: $etablissement_convention_groupement
        etablissement_personne_morale: $etablissement_personne_morale
        nombre_etablissements: $nombre_etablissements
        personnalite_juridique_etablissement: $personnalite_juridique_etablissement
        raison_sociale: $raison_sociale
        region: $region
        total_mesures_etablissements: $total_mesures_etablissements
      }
    ) {
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
