const {
  informationsGeneralesMandataireSchema,
  informationsAgrementsMandataireSchema,
  informationsFormationMandataireSchema,
  prestationsSocialesSchema,
  formationsSchema,
  activiteSchema,
  populationsSchema
} = require("./schemas");

async function enqueteMandataireIndividuelStatus(enqueteReponse) {
  const informationsGeneralesMandataireIsValid = await informationsGeneralesMandataireSchema.isValid(
    enqueteReponse.enquete_reponses_informations_mandataire
  );

  // TODO
  const informationsAgrementsMandataireIsValid = await informationsAgrementsMandataireSchema.isValid(
    {}
  );

  // TODO
  const informationsFormationMandataireIsValid = await informationsFormationMandataireSchema.isValid(
    {}
  );

  // TODO
  const prestationsSocialesIsValid = await prestationsSocialesSchema.isValid(
    {}
  );

  const formationsIsValid = await formationsSchema.isValid({
    annee_agrement: enqueteReponse.annee_agrement,
    annee_debut_activite: enqueteReponse.annee_debut_activite,
    cnc_maj_heure_formation: enqueteReponse.cnc_maj_heure_formation,
    cnc_mjpm_heure_formation: enqueteReponse.cnc_mjpm_heure_formation,
    cnc_maj_annee_obtention: enqueteReponse.cnc_maj_annee_obtention,
    cnc_dpf_annee_obtention: enqueteReponse.cnc_dpf_annee_obtention,
    cnc_dpf_heure_formation: enqueteReponse.cnc_dpf_heure_formation,
    cnc_mjpm_annee_obtention: enqueteReponse.cnc_mjpm_annee_obtention,
    cumul_delegue_service: enqueteReponse.cumul_delegue_service,
    cumul_delegue_service_etp: enqueteReponse.cumul_delegue_service_etp,
    cumul_prepose: enqueteReponse.cumul_prepose,
    cumul_prepose_etp: enqueteReponse.cumul_prepose_etp,
    debut_activite_avant_2009: enqueteReponse.debut_activite_avant_2009,
    niveau_qualification: enqueteReponse.niveau_qualification,
    niveau_qualification_secretaire_spe:
      enqueteReponse.niveau_qualification_secretaire_spe,
    secretaire_specialise: enqueteReponse.secretaire_specialise,
    nb_departements: enqueteReponse.nb_departements
  });

  const activiteIsValid = await activiteSchema.isValid({
    accompagnement_judiciaire_domicile_debut_annee:
      enqueteReponse.accompagnement_judiciaire_domicile_debut_annee,
    accompagnement_judiciaire_domicile_fin_annee:
      enqueteReponse.accompagnement_judiciaire_domicile_fin_annee,
    accompagnement_judiciaire_etablissement_debut_annee:
      enqueteReponse.accompagnement_judiciaire_etablissement_debut_annee,
    accompagnement_judiciaire_etablissement_fin_annee:
      enqueteReponse.accompagnement_judiciaire_etablissement_fin_annee,
    curatelle_biens_domicile_debut_annee:
      enqueteReponse.curatelle_biens_domicile_debut_annee,
    curatelle_biens_domicile_fin_annee:
      enqueteReponse.curatelle_biens_domicile_fin_annee,
    curatelle_biens_etablissement_debut_annee:
      enqueteReponse.curatelle_biens_etablissement_debut_annee,
    curatelle_biens_etablissement_fin_annee:
      enqueteReponse.curatelle_biens_etablissement_fin_annee,
    revisions_main_levee: enqueteReponse.revisions_main_levee,
    revisions_masp: enqueteReponse.revisions_masp,
    revisions_reconduction: enqueteReponse.revisions_reconduction,
    revisions_changement: enqueteReponse.revisions_changement,
    revisions_autre: enqueteReponse.revisions_autre,
    tutelle_domicile_debut_annee: enqueteReponse.tutelle_domicile_debut_annee,
    tutelle_domicile_fin_annee: enqueteReponse.tutelle_domicile_fin_annee,
    tutelle_etablissement_debut_annee:
      enqueteReponse.tutelle_etablissement_debut_annee,
    tutelle_etablissement_fin_annee:
      enqueteReponse.tutelle_etablissement_fin_annee,
    curatelle_personne_domicile_debut_annee:
      enqueteReponse.curatelle_personne_domicile_debut_annee,
    curatelle_personne_domicile_fin_annee:
      enqueteReponse.curatelle_personne_domicile_fin_annee,
    curatelle_personne_etablissement_debut_annee:
      enqueteReponse.curatelle_personne_etablissement_debut_annee,
    curatelle_personne_etablissement_fin_annee:
      enqueteReponse.curatelle_personne_etablissement_fin_annee,
    curatelle_renforcee_domicile_debut_annee:
      enqueteReponse.curatelle_renforcee_domicile_debut_annee,
    curatelle_renforcee_domicile_fin_annee:
      enqueteReponse.curatelle_renforcee_domicile_fin_annee,
    curatelle_renforcee_etablissement_debut_annee:
      enqueteReponse.curatelle_renforcee_etablissement_debut_annee,
    curatelle_renforcee_etablissement_fin_annee:
      enqueteReponse.curatelle_renforcee_etablissement_fin_annee,
    curatelle_simple_domicile_debut_annee:
      enqueteReponse.curatelle_simple_domicile_debut_annee,
    curatelle_simple_domicile_fin_annee:
      enqueteReponse.curatelle_simple_domicile_fin_annee,
    curatelle_simple_etablissement_debut_annee:
      enqueteReponse.curatelle_simple_etablissement_debut_annee,
    curatelle_simple_etablissement_fin_annee:
      enqueteReponse.curatelle_simple_etablissement_fin_annee
  });

  const populationsIsValid = await populationsSchema.isValid({
    tutelle_age_inf_25_ans_homme: enqueteReponse.tutelle_age_inf_25_ans_homme,
    tutelle_age_inf_25_ans_femme: enqueteReponse.tutelle_age_inf_25_ans_femme,
    tutelle_age_25_39_ans_homme: enqueteReponse.tutelle_age_25_39_ans_homme,
    tutelle_age_25_39_ans_femme: enqueteReponse.tutelle_age_25_39_ans_femme,
    tutelle_age_40_59_ans_homme: enqueteReponse.tutelle_age_40_59_ans_homme,
    tutelle_age_40_59_ans_femme: enqueteReponse.tutelle_age_40_59_ans_femme,
    tutelle_age_60_74_ans_homme: enqueteReponse.tutelle_age_60_74_ans_homme,
    tutelle_age_60_74_ans_femme: enqueteReponse.tutelle_age_60_74_ans_femme,
    tutelle_age_sup_75_ans_homme: enqueteReponse.tutelle_age_sup_75_ans_homme,
    tutelle_age_sup_75_ans_femme: enqueteReponse.tutelle_age_sup_75_ans_femme,
    curatelle_age_inf_25_ans_homme:
      enqueteReponse.curatelle_age_inf_25_ans_homme,
    curatelle_age_inf_25_ans_femme:
      enqueteReponse.curatelle_age_inf_25_ans_femme,
    curatelle_age_25_39_ans_homme: enqueteReponse.curatelle_age_25_39_ans_homme,
    curatelle_age_25_39_ans_femme: enqueteReponse.curatelle_age_25_39_ans_femme,
    curatelle_age_40_59_ans_homme: enqueteReponse.curatelle_age_40_59_ans_homme,
    curatelle_age_40_59_ans_femme: enqueteReponse.curatelle_age_40_59_ans_femme,
    curatelle_age_60_74_ans_homme: enqueteReponse.curatelle_age_60_74_ans_homme,
    curatelle_age_60_74_ans_femme: enqueteReponse.curatelle_age_60_74_ans_femme,
    curatelle_age_sup_75_ans_homme:
      enqueteReponse.curatelle_age_sup_75_ans_homme,
    curatelle_age_sup_75_ans_femme:
      enqueteReponse.curatelle_age_sup_75_ans_femme,
    maj_age_inf_25_ans_homme: enqueteReponse.maj_age_inf_25_ans_homme,
    maj_age_inf_25_ans_femme: enqueteReponse.maj_age_inf_25_ans_femme,
    maj_age_25_39_ans_homme: enqueteReponse.maj_age_25_39_ans_homme,
    maj_age_25_39_ans_femme: enqueteReponse.maj_age_25_39_ans_femme,
    maj_age_40_59_ans_homme: enqueteReponse.maj_age_40_59_ans_homme,
    maj_age_40_59_ans_femme: enqueteReponse.maj_age_40_59_ans_femme,
    maj_age_60_74_ans_homme: enqueteReponse.maj_age_60_74_ans_homme,
    maj_age_60_74_ans_femme: enqueteReponse.maj_age_60_74_ans_femme,
    maj_age_sup_75_ans_homme: enqueteReponse.maj_age_sup_75_ans_homme,
    maj_age_sup_75_ans_femme: enqueteReponse.maj_age_sup_75_ans_femme,
    sauvegarde_justice_age_inf_25_ans_homme:
      enqueteReponse.sauvegarde_justice_age_inf_25_ans_homme,
    sauvegarde_justice_age_inf_25_ans_femme:
      enqueteReponse.sauvegarde_justice_age_inf_25_ans_femme,
    sauvegarde_justice_age_25_39_ans_homme:
      enqueteReponse.sauvegarde_justice_age_25_39_ans_homme,
    sauvegarde_justice_age_25_39_ans_femme:
      enqueteReponse.sauvegarde_justice_age_25_39_ans_femme,
    sauvegarde_justice_age_40_59_ans_homme:
      enqueteReponse.sauvegarde_justice_age_40_59_ans_homme,
    sauvegarde_justice_age_40_59_ans_femme:
      enqueteReponse.sauvegarde_justice_age_40_59_ans_femme,
    sauvegarde_justice_age_60_74_ans_homme:
      enqueteReponse.sauvegarde_justice_age_60_74_ans_homme,
    sauvegarde_justice_age_60_74_ans_femme:
      enqueteReponse.sauvegarde_justice_age_60_74_ans_femme,
    sauvegarde_justice_age_sup_75_ans_homme:
      enqueteReponse.sauvegarde_justice_age_sup_75_ans_homme,
    sauvegarde_justice_age_sup_75_ans_femme:
      enqueteReponse.sauvegarde_justice_age_sup_75_ans_femme,
    autre_age_inf_25_ans_homme: enqueteReponse.autre_age_inf_25_ans_homme,
    autre_age_inf_25_ans_femme: enqueteReponse.autre_age_inf_25_ans_femme,
    autre_age_25_39_ans_homme: enqueteReponse.autre_age_25_39_ans_homme,
    autre_age_25_39_ans_femme: enqueteReponse.autre_age_25_39_ans_femme,
    autre_age_40_59_ans_homme: enqueteReponse.autre_age_40_59_ans_homme,
    autre_age_40_59_ans_femme: enqueteReponse.autre_age_40_59_ans_femme,
    autre_age_60_74_ans_homme: enqueteReponse.autre_age_60_74_ans_homme,
    autre_age_60_74_ans_femme: enqueteReponse.autre_age_60_74_ans_femme,
    autre_age_sup_75_ans_homme: enqueteReponse.autre_age_sup_75_ans_homme,
    autre_age_sup_75_ans_femme: enqueteReponse.autre_age_sup_75_ans_femme,
    tutelle_anciennete_inf_1_an: enqueteReponse.tutelle_anciennete_inf_1_an,
    tutelle_anciennete_1_3_ans: enqueteReponse.tutelle_anciennete_1_3_ans,
    tutelle_anciennete_3_5_ans: enqueteReponse.tutelle_anciennete_3_5_ans,
    tutelle_anciennete_5_10_ans: enqueteReponse.tutelle_anciennete_5_10_ans,
    tutelle_anciennete_sup_10_ans: enqueteReponse.tutelle_anciennete_sup_10_ans,
    curatelle_anciennete_inf_1_an: enqueteReponse.curatelle_anciennete_inf_1_an,
    curatelle_anciennete_1_3_ans: enqueteReponse.curatelle_anciennete_1_3_ans,
    curatelle_anciennete_3_5_ans: enqueteReponse.curatelle_anciennete_3_5_ans,
    curatelle_anciennete_5_10_ans: enqueteReponse.curatelle_anciennete_5_10_ans,
    curatelle_anciennete_sup_10_ans:
      enqueteReponse.curatelle_anciennete_sup_10_ans,
    maj_anciennete_inf_1_an: enqueteReponse.maj_anciennete_inf_1_an,
    maj_anciennete_1_3_ans: enqueteReponse.maj_anciennete_1_3_ans,
    maj_anciennete_3_5_ans: enqueteReponse.maj_anciennete_3_5_ans,
    maj_anciennete_5_10_ans: enqueteReponse.maj_anciennete_5_10_ans,
    maj_anciennete_sup_10_ans: enqueteReponse.maj_anciennete_sup_10_ans,
    sauvegarde_justice_anciennete_inf_1_an:
      enqueteReponse.sauvegarde_justice_anciennete_inf_1_an,
    sauvegarde_justice_anciennete_1_3_ans:
      enqueteReponse.sauvegarde_justice_anciennete_1_3_ans,
    sauvegarde_justice_anciennete_3_5_ans:
      enqueteReponse.sauvegarde_justice_anciennete_3_5_ans,
    sauvegarde_justice_anciennete_5_10_ans:
      enqueteReponse.sauvegarde_justice_anciennete_5_10_ans,
    sauvegarde_justice_anciennete_sup_10_ans:
      enqueteReponse.sauvegarde_justice_anciennete_sup_10_ans,
    autre_anciennete_inf_1_an: enqueteReponse.autre_anciennete_inf_1_an,
    autre_justice_anciennete_1_3_ans:
      enqueteReponse.autre_justice_anciennete_1_3_ans,
    autre_justice_anciennete_3_5_ans:
      enqueteReponse.autre_justice_anciennete_3_5_ans,
    autre_justice_anciennete_5_10_ans:
      enqueteReponse.autre_justice_anciennete_5_10_ans,
    autre_justice_anciennete_sup_10_ans:
      enqueteReponse.autre_justice_anciennete_sup_10_ans,
    tutelle_etablissement_personne_handicapee:
      enqueteReponse.tutelle_etablissement_personne_handicapee,
    tutelle_service_personne_handicapee:
      enqueteReponse.tutelle_service_personne_handicapee,
    tutelle_ehpad: enqueteReponse.tutelle_ehpad,
    tutelle_autre_etablissement_personne_agee:
      enqueteReponse.tutelle_autre_etablissement_personne_agee,
    tutelle_chrs: enqueteReponse.tutelle_chrs,
    tutelle_service_hospitalier_soins_longue_duree:
      enqueteReponse.tutelle_service_hospitalier_soins_longue_duree,
    tutelle_service_psychiatrique: enqueteReponse.tutelle_service_psychiatrique,
    tutelle_autre_service: enqueteReponse.tutelle_autre_service,
    curatelle_etablissement_personne_handicapee:
      enqueteReponse.curatelle_etablissement_personne_handicapee,
    curatelle_service_personne_handicapee:
      enqueteReponse.curatelle_service_personne_handicapee,
    curatelle_ehpad: enqueteReponse.curatelle_ehpad,
    curatelle_autre_etablissement_personne_agee:
      enqueteReponse.curatelle_autre_etablissement_personne_agee,
    curatelle_chrs: enqueteReponse.curatelle_chrs,
    curatelle_service_hospitalier_soins_longue_duree:
      enqueteReponse.curatelcuratelle_service_hospitalier_soins_longue_dureele_renforcee_etablissement_fin_annee,
    curatelle_service_psychiatrique:
      enqueteReponse.curatelle_service_psychiatrique,
    curatelle_autre_service: enqueteReponse.curatelle_autre_service,
    maj_etablissement_personne_handicapee:
      enqueteReponse.maj_etablissement_personne_handicapee,
    maj_service_personne_handicapee:
      enqueteReponse.maj_service_personne_handicapee,
    maj_ehpad: enqueteReponse.maj_ehpad,
    maj_autre_etablissement_personne_agee:
      enqueteReponse.maj_autre_etablissement_personne_agee,
    maj_chrs: enqueteReponse.maj_chrs,
    maj_service_hospitalier_soins_longue_duree:
      enqueteReponse.maj_service_hospitalier_soins_longue_duree,
    maj_service_psychiatrique: enqueteReponse.maj_service_psychiatrique,
    maj_autre_service: enqueteReponse.maj_autre_service,
    sauvegarde_justice_etablissement_personne_handicapee:
      enqueteReponse.sauvegarde_justice_etablissement_personne_handicapee,
    sauvegarde_justice_service_personne_handicapee:
      enqueteReponse.sauvegarde_justice_service_personne_handicapee,
    sauvegarde_justice_ehpad: enqueteReponse.sauvegarde_justice_ehpad,
    sauvegarde_justice_autre_etablissement_personne_agee:
      enqueteReponse.sauvegarde_justice_autre_etablissement_personne_agee,
    sauvegarde_justice_chrs: enqueteReponse.sauvegarde_justice_chrs,
    sauvegarde_justice_service_hospitalier_soins_longue_duree:
      enqueteReponse.sauvegarde_justice_service_hospitalier_soins_longue_duree,
    sauvegarde_justice_service_psychiatrique:
      enqueteReponse.sauvegarde_justice_service_psychiatrique,
    sauvegarde_justice_autre_service:
      enqueteReponse.sauvegarde_justice_autre_service
  });

  return {
    informationsGeneralesMandataireStatus:
      informationsGeneralesMandataireIsValid === true ? 2 : 1,
    informationsFormationMandataireStatus:
      informationsFormationMandataireIsValid === true ? 2 : 1,
    informationsAgrementsMandataireStatus:
      informationsAgrementsMandataireIsValid === true ? 2 : 1,
    prestationsSocialesStatus: prestationsSocialesIsValid === true ? 2 : 1,
    agrementsFormationsStatus: formationsIsValid === true ? 2 : 1,
    activiteStatus: activiteIsValid === true ? 2 : 1,
    populationsStatus: populationsIsValid === true ? 2 : 1
  };
}

module.exports = enqueteMandataireIndividuelStatus;
