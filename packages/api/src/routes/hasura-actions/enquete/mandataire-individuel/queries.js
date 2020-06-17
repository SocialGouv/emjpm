function build2Combinaisons(prefixes, suffixes, separator) {
  if (separator === undefined) {
    separator = "_";
  }
  return prefixes
    .reduce(
      (acc, prefix) =>
        suffixes.reduce((acc, suffix) => {
          acc.push(`${prefix}${separator}${suffix}`);
          return acc;
        }, acc),

      []
    )
    .join("\n");
}
function build3Combinaisons(prefixes, middles, suffixes, separator) {
  if (separator === undefined) {
    separator = "_";
  }
  return prefixes
    .reduce(
      (acc, prefix) =>
        middles.reduce(
          (acc, middle) =>
            suffixes.reduce((acc, suffix) => {
              acc.push(`${prefix}${separator}${middle}${separator}${suffix}`);
              return acc;
            }, acc),
          acc
        ),
      []
    )
    .join("\n");
}

module.exports = {
  ENQUETE_REPONSE: `
  query enquete_reponses($enqueteId: Int!, $mandataireId: Int!) {
    enquete_reponses(where: {enquete_id: {_eq: $enqueteId}, mandataire_id: { _eq: $mandataireId }}) {
      id
      status
      submitted_at
      enquete_id
      enquete_reponses_activite_id
      enquete_reponses_activite {
        created_at
        last_update
        ${build3Combinaisons(
          [
            "accompagnement_judiciaire",
            "curatelle_biens",
            "tutelle",
            "curatelle_personne",
            "curatelle_renforcee",
            "curatelle_simple",
          ],
          ["domicile", "etablissement"],
          ["debut_annee", "fin_annee", "mesures_nouvelles", "sortie_mesures"],
          "_"
        )}
        ${build2Combinaisons(
          [
            "subroge_tuteur_createur",
            "sauvegarde_justice",
            "mandat_adhoc_majeur",
          ],
          ["debut_annee", "fin_annee", "mesures_nouvelles", "sortie_mesures"],
          "_"
        )}
        revisions_main_levee
        revisions_masp
        revisions_reconduction
        revisions_changement
        revisions_autre
        sorties_main_levee
        sorties_deces
        sorties_masp
      }
      enquete_reponses_agrements_formations_id
      enquete_reponses_agrements_formation {
        created_at
        last_update
        annee_agrement
        annee_debut_activite
        cumul_delegue_service
        cumul_delegue_service_etp
        cumul_prepose
        cumul_prepose_etp
        cnc_annee_obtention
        cnc_heures_formation
        debut_activite_avant_2009
        niveau_qualification
        nb_departements
        nb_mesures_dep_finance
        nb_mesures_dep_autres
        secretaire_specialise_etp_n1
        secretaire_specialise_etp_n2
        secretaire_specialise_etp_n3
        secretaire_specialise_etp_n4
        secretaire_specialise_etp_n5
        secretaire_specialise_etp_n6
        secretaire_specialise
      }
      enquete_reponses_informations_mandataire_id
      enquete_reponses_informations_mandataire {
        created_at
        last_update
        benevole
        forme_juridique
        sexe
        anciennete
        exerce_seul_activite
        estimation_etp
        exerce_secretaires_specialises
        secretaire_specialise_etp
        local_professionnel
        region
        nom
        departement
        tranche_age
      }
      enquete_reponses_populations_id
      enquete_reponses_population {
        created_at
        last_update
        tutelle_age_inf_25_ans_homme
        tutelle_age_inf_25_ans_femme
        tutelle_age_25_39_ans_homme
        tutelle_age_25_39_ans_femme
        tutelle_age_40_59_ans_homme
        tutelle_age_40_59_ans_femme
        tutelle_age_60_74_ans_homme
        tutelle_age_60_74_ans_femme
        tutelle_age_sup_75_ans_homme
        tutelle_age_sup_75_ans_femme
        curatelle_age_inf_25_ans_homme
        curatelle_age_inf_25_ans_femme
        curatelle_age_25_39_ans_homme
        curatelle_age_25_39_ans_femme
        curatelle_age_40_59_ans_homme
        curatelle_age_40_59_ans_femme
        curatelle_age_60_74_ans_homme
        curatelle_age_60_74_ans_femme
        curatelle_age_sup_75_ans_homme
        curatelle_age_sup_75_ans_femme
        maj_age_inf_25_ans_homme
        maj_age_inf_25_ans_femme
        maj_age_25_39_ans_homme
        maj_age_25_39_ans_femme
        maj_age_40_59_ans_homme
        maj_age_40_59_ans_femme
        maj_age_60_74_ans_homme
        maj_age_60_74_ans_femme
        maj_age_sup_75_ans_homme
        maj_age_sup_75_ans_femme
        sauvegarde_justice_age_inf_25_ans_homme
        sauvegarde_justice_age_inf_25_ans_femme
        sauvegarde_justice_age_25_39_ans_homme
        sauvegarde_justice_age_25_39_ans_femme
        sauvegarde_justice_age_40_59_ans_homme
        sauvegarde_justice_age_40_59_ans_femme
        sauvegarde_justice_age_60_74_ans_homme
        sauvegarde_justice_age_60_74_ans_femme
        sauvegarde_justice_age_sup_75_ans_homme
        sauvegarde_justice_age_sup_75_ans_femme
        tutelle_anciennete_inf_1_an
        tutelle_anciennete_1_3_ans
        tutelle_anciennete_3_5_ans
        tutelle_anciennete_5_10_ans
        tutelle_anciennete_sup_10_ans
        curatelle_anciennete_inf_1_an
        curatelle_anciennete_1_3_ans
        curatelle_anciennete_3_5_ans
        curatelle_anciennete_5_10_ans
        curatelle_anciennete_sup_10_ans
        maj_anciennete_inf_1_an
        maj_anciennete_1_3_ans
        maj_anciennete_3_5_ans
        maj_anciennete_5_10_ans
        maj_anciennete_sup_10_ans
        sauvegarde_justice_anciennete_inf_1_an
        sauvegarde_justice_anciennete_1_3_ans
        sauvegarde_justice_anciennete_3_5_ans
        sauvegarde_justice_anciennete_5_10_ans
        sauvegarde_justice_anciennete_sup_10_ans
        autre_mesures_age_inf_25_ans_homme
        autre_mesures_age_inf_25_ans_femme
        autre_mesures_age_25_39_ans_homme
        autre_mesures_age_25_39_ans_femme
        autre_mesures_age_40_59_ans_homme
        autre_mesures_age_40_59_ans_femme
        autre_mesures_age_60_74_ans_homme
        autre_mesures_age_60_74_ans_femme
        autre_mesures_age_sup_75_ans_homme
        autre_mesures_age_sup_75_ans_femme
        autre_mesures_anciennete_inf_1_an
        autre_mesures_anciennete_1_3_ans
        autre_mesures_anciennete_3_5_ans
        autre_mesures_anciennete_5_10_ans
        autre_mesures_anciennete_sup_10_ans
        tutelle_etablissement_personne_handicapee
        tutelle_service_personne_handicapee
        tutelle_ehpad
        tutelle_autre_etablissement_personne_agee
        tutelle_chrs
        tutelle_service_hospitalier_soins_longue_duree
        tutelle_service_psychiatrique
        tutelle_autre_service
        curatelle_etablissement_personne_handicapee
        curatelle_service_personne_handicapee
        curatelle_ehpad
        curatelle_autre_etablissement_personne_agee
        curatelle_chrs
        curatelle_service_hospitalier_soins_longue_duree
        curatelle_service_psychiatrique
        curatelle_autre_service
        maj_etablissement_personne_handicapee
        maj_service_personne_handicapee
        maj_ehpad
        maj_autre_etablissement_personne_agee
        maj_chrs
        maj_service_hospitalier_soins_longue_duree
        maj_service_psychiatrique
        maj_autre_service
        sauvegarde_justice_etablissement_personne_handicapee
        sauvegarde_justice_service_personne_handicapee
        sauvegarde_justice_ehpad
        sauvegarde_justice_autre_etablissement_personne_agee
        sauvegarde_justice_chrs
        sauvegarde_justice_service_hospitalier_soins_longue_duree
        sauvegarde_justice_service_psychiatrique
        sauvegarde_justice_autre_service
      }
      enquete_reponses_prestations_sociale_id
      enquete_reponses_prestations_sociale {
        aah
        als_apl
        apa
        asi
        aspa
        id
        pch
        rsa
        created_at
        last_update
      }
    }
  }  
`,
};
