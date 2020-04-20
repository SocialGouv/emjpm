import { EnqueteReponse } from "../types";

export function mapEnqueteIndividuelProperties(enqueteReponse: EnqueteReponse) {
  return {
    activite: {
      accompagnement_judiciaire_domicile:
        enqueteReponse.activite_accompagnement_judiciaire_domicile,
      accompagnement_judiciaire_etablissement:
        enqueteReponse.activite_accompagnement_judiciaire_etablissement,
      curatelle_biens_domicile:
        enqueteReponse.activite_curatelle_biens_domicile,
      curatelle_biens_etablissement:
        enqueteReponse.activite_curatelle_biens_etablissement,
      curatelle_personne_domicile:
        enqueteReponse.activite_curatelle_personne_domicile,
      curatelle_personne_etablissement:
        enqueteReponse.activite_curatelle_personne_etablissement,
      curatelle_renforcee_domicile_debut_annee:
        enqueteReponse.activite_curatelle_renforcee_domicile_debut_annee,
      curatelle_renforcee_domicile_fin_annee:
        enqueteReponse.activite_curatelle_renforcee_domicile_fin_annee,
      curatelle_renforcee_etablissement_debut_annee:
        enqueteReponse.activite_curatelle_renforcee_etablissement_debut_annee,
      curatelle_renforcee_etablissement_fin_annee:
        enqueteReponse.activite_curatelle_renforcee_etablissement_fin_annee,
      curatelle_simple_domicile_debut_annee:
        enqueteReponse.activite_curatelle_simple_domicile_debut_annee,
      curatelle_simple_domicile_fin_annee:
        enqueteReponse.activite_curatelle_simple_domicile_fin_annee,
      curatelle_simple_etablissement_debut_annee:
        enqueteReponse.activite_curatelle_simple_etablissement_debut_annee,
      curatelle_simple_etablissement_fin_annee:
        enqueteReponse.activite_curatelle_simple_etablissement_fin_annee,
      revisions_autre: enqueteReponse.activite_revisions_autre,
      revisions_changement: enqueteReponse.activite_revisions_changement,
      revisions_main_levee: enqueteReponse.activite_revisions_main_levee,
      revisions_masp: enqueteReponse.activite_revisions_masp,
      revisions_reconduction: enqueteReponse.activite_revisions_reconduction,
      sorties_deces: enqueteReponse.activite_sorties_deces,
      sorties_main_levee: enqueteReponse.activite_sorties_main_levee,
      sorties_masp: enqueteReponse.activite_sorties_masp,
      tutelle_domicile: enqueteReponse.activite_tutelle_domicile,
      tutelle_etablissement: enqueteReponse.activite_tutelle_etablissement
    },
    enquete_id: enqueteReponse.enquete_id,
    enquete_individuel_id: enqueteReponse.enquete_individuel.id,
    enquete_reponse_id: enqueteReponse.id,
    informations: {
      annee_agrement: enqueteReponse.enquete_individuel.annee_agrement,
      annee_debut_activite:
        enqueteReponse.enquete_individuel.annee_debut_activite,
      cnc_dpf_annee_obtention:
        enqueteReponse.enquete_individuel.cnc_dpf_annee_obtention,
      cnc_dpf_heure_formation:
        enqueteReponse.enquete_individuel.cnc_dpf_heure_formation,
      cnc_maj_annee_obtention:
        enqueteReponse.enquete_individuel.cnc_maj_annee_obtention,
      cnc_maj_heure_formation:
        enqueteReponse.enquete_individuel.cnc_maj_heure_formation,
      cnc_mjpm_annee_obtention:
        enqueteReponse.enquete_individuel.cnc_mjpm_annee_obtention,
      cnc_mjpm_heure_formation:
        enqueteReponse.enquete_individuel.cnc_mjpm_heure_formation,
      cumul_delegue_service:
        enqueteReponse.enquete_individuel.cumul_delegue_service,
      cumul_delegue_service_etp:
        enqueteReponse.enquete_individuel.cumul_delegue_service_etp,
      cumul_prepose: enqueteReponse.enquete_individuel.cumul_prepose,
      cumul_prepose_etp: enqueteReponse.enquete_individuel.cumul_prepose_etp,
      debut_activite_avant_2009:
        enqueteReponse.enquete_individuel.debut_activite_avant_2009,
      estimation_etp: enqueteReponse.enquete_individuel.estimation_etp,
      niveau_qualification:
        enqueteReponse.enquete_individuel.niveau_qualification,
      niveau_qualification_secretaire_spe:
        enqueteReponse.enquete_individuel.niveau_qualification_secretaire_spe,
      secretaire_specialise:
        enqueteReponse.enquete_individuel.secretaire_specialise,
      secretaire_specialise_etp:
        enqueteReponse.enquete_individuel.secretaire_specialise_etp
    },
    mandataire_id: enqueteReponse.enquete_individuel.mandataire_id
  };
}
