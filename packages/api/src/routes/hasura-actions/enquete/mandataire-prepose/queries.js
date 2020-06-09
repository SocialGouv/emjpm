module.exports = {
  ENQUETE_REPONSE_MANDATAIRE_PREPOSE: `
  query enquete_reponses_prepose($enqueteId: Int!, $mandataireId: Int!) {
    enquete_reponses(where: {enquete_id: {_eq: $enqueteId}, mandataire_id: {_eq: $mandataireId}}) {
      id
      submitted_at
      enquete_id
      enquete_reponses_populations_id
      enquete_reponses_financement_id
      enquete_reponses_financement {
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
      enquete_reponses_activite_id
      enquete_reponses_prepose_personel_formation_id
      enquete_reponses_prepose_personel_formation {
        created_at
        last_update
        nb_preposes_mjpm
        nb_preposes_mjpm_etp
        formation_preposes_mjpm
        niveaux_qualification
        nb_preposes_homme
        nb_preposes_femme
        nb_autre_personnel
        nb_autre_personnel_etp
      }
      enquete_reponses_modalites_exercice_id
      enquete_reponses_modalites_exercice {
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
  }  
  `
};
