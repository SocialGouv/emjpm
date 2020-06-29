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
  ENQUETE_REPONSE_DEFAULT_VALUES: `
    query enquete_prepose_default_values($mandataireId: Int!) {
      mandataires_by_pk(id: $mandataireId) {
        id
        lb_user {
          nom
          prenom
          lb_departements(where: {departement_financeur: {_eq: true}}) {
            departement {
              nom
              region {
                nom
              }
            }
          }
        }
      }
    }
  `,
  ENQUETE_REPONSE_MANDATAIRE_PREPOSE: `
  query enquete_reponses_prepose($enqueteId: Int!, $mandataireId: Int!) {
    enquete_reponses(where: {enquete_id: {_eq: $enqueteId}, mandataire_id: {_eq: $mandataireId}}) {
      id
      status
      user_type
      submitted_at
      enquete_id
      mandataire {
        id
        user {
          id
          prenom
          nom
          type
        }
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
        created_at
        departement
        id
        last_update
        activite_exercee_par
        etablissements_type
        nombre_lits_journee_hospitalisation
        personnalite_juridique_etablissement
        raison_sociale
        region
        total_mesures_etablissements
      }
      enquete_reponses_prepose_prestations_sociales_id
      enquete_reponses_prepose_prestations_sociale{
        tutelle
        curatelle_simple
        curatelle_renforcee
        sauvegarde_autres_mesures
        maj
        aah
        pch
        asi
        rsa
        als_apl
        aspa
        apa
      }
    }
  }  
  `,
};
