const {
  gqlAu1erJanvier,
  gqlAu31Decembre,
  gqlDu1erJanvierAu31Decembre,
  gqlEtalblissement,
  gqlDomicile,
  gqlCuratelle,
  gqlBiens,
  gqlPersonne,
  gqlNouvelles,
  gqlSorties,
  gqlRevisionChangement,
  gqlRevisionAutre,
  gqlNatureMesureAutre,
  gqlNatureMesureAutre2,
  gqlChrs,
  gqlTutelle,
  build2Combinaisons,
  build3Combinaisons,
} = require("~/routes/hasura-actions/enquete/common/gql-snippets");
const { range } = require("~/routes/hasura-actions/enquete/common/utils");

const trancheFrom2To10 = range(2, 10)
  .map(
    (i) => `
    tutelle_tranche${i}: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlTutelle}
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche${
            i - 1
          }} } },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche${i}} } },
        ]
      }
    ){
      aggregate { count }
    }
    curatelle_simple_tranche${i}: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: curatelle_simple} },
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche${
            i - 1
          }} } },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche${i}} } },
        ]
      }
    ){
      aggregate { count }
    }
    curatelle_renforcee_tranche${i}: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: curatelle_renforcee} },
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche${
            i - 1
          }} } },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche${i}} } },
        ]
      }
    ){
      aggregate { count }
    }
    sauvegarde_autres_mesures_tranche${i}: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre2}
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche${
            i - 1
          }} } },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche${i}} } },
        ]
      }
    ){
      aggregate { count }
    }
    maj_tranche${i}: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche${
            i - 1
          }} } },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche${i}} } },
        ]
      }
    ){
      aggregate { count }
    }
`
  )
  .join("\n");

module.exports = {
  ENQUETE: `
  query enquete($enqueteId: Int!) {
    enquetes_by_pk(id: $enqueteId){
      id
      annee
    }
  }
  `,
  ENQUETE_REPONSE_DEFAULT_VALUES: `
  query enquete_prepose_default_values(
    $mandataireId: Int!,
    $year: String!,
  ) {
    mandataires_by_pk(id: $mandataireId) {
      id
      departement{
        id
        nom
        region {
          nom
        }
      }
      lb_user {
        id
        nom
        prenom
        etablissement_rattachement: lb_user_etablissements(where: {etablissement_rattachement: {_eq: true}}) {
          etablissement {
            rslongue
            id
            departement {
              id
              nom
              region {
                id
                nom
              }
            }
          }
        }
        lb_user_etablissements {
          etablissement {
            id
            nofinesset
            rslongue
            libcategagretab
            libsph
            departement {
              id
              nom
              region {
                id
                nom
              }
            }
          }
        }
        lb_departements(where: {departement_financeur: {_eq: true}}) {
          id
          departement {
            id
            nom
            region {
              nom
            }
          }
        }
      }
    }

    previous_enquete: enquetes(where: {annee: {_eq: $year}}){
        id
        enquete_reponses(where: {mandataire_id: {_eq: $mandataireId}}) {
          enquete_reponses_prepose_personel_formation{
            nb_preposes_mjpm
            nb_preposes_mjpm_etp
            formation_preposes_mjpm
            niveaux_qualification
            nb_preposes_homme
            nb_preposes_femme
            nb_autre_personnel
            nb_autre_personnel_etp
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
      enquete_reponses_population {
        id
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
      enquete_reponses_financement {
        id
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
      enquete_reponses_activite {
        id
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
      enquete_reponses_prepose_personel_formation {
        id
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
      enquete_reponses_modalites_exercice {
        id
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
      enquete_reponses_prepose_prestations_sociale{
        id
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

  INFO_FINANCE_ANNEE: `
  query info_finance_annee($year: Int!){
    info_finance_annee(
      where: {
        annee: {_eq: $year},
        _or: [
          { type: {_eq: smic_mensuel} },
          { type: {_eq: aah_annuel} },
        ]
      }
    ){
      type
      montant
    }
  }
  `,

  NB_MESURES: `
    query nb_mesures(
      $mandataireId: Int!,
      $departementCode: String,
      $dateStart: date!,
      $dateEnd: date!,
      $yearLess25: String!,
      $yearLess39: String!,
      $yearLess40: String!,
      $yearLess59: String!,
      $yearLess60: String!,
      $yearLess74: String!,
      $yearLess75: String!
      $dateYearLess1: date!,
      $dateYearLess3: date!,
      $dateYearLess5: date!,
      $dateYearLess10: date!,
    ) {

      total_mesures_etablissements: mesures_aggregate(where: {
        _and: [
          {
            mandataire_id : {_eq: $mandataireId}
          },
          {
            date_nomination: {_gte: $dateStart}
          },
          {
            _or: [
              {
                date_fin_mesure : {
                  _lte: $dateEnd
                }
              },
              {
                date_fin_mesure : {
                  _is_null: true
                }
              }
            ]
          }
        ]
      }){
        aggregate {
          count
        }
      }

      curatelle_renforcee_etablissement_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlEtalblissement}
          { nature_mesure: {_eq: curatelle_renforcee} },
        ]
      }){
        aggregate { count }
      }
      
      curatelle_renforcee_etablissement_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlEtalblissement}
          { nature_mesure: {_eq: curatelle_renforcee} },
        ]
      }){
        aggregate { count }
      }
      curatelle_renforcee_domicile_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlDomicile}
          { nature_mesure: {_eq: curatelle_renforcee} },
        ]
      }){
        aggregate { count }
      }
      curatelle_renforcee_domicile_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlDomicile}
          { nature_mesure: {_eq: curatelle_renforcee} },
        ]
      }){
        aggregate { count }
      }

      curatelle_simple_etablissement_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlEtalblissement}
          { nature_mesure: {_eq: curatelle_simple} },
        ]
      }){
        aggregate { count }
     }
     curatelle_simple_etablissement_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlEtalblissement}
          { nature_mesure: {_eq: curatelle_simple} },
        ]
      }){
        aggregate { count }
      }
      curatelle_simple_domicile_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlDomicile}
          { nature_mesure: {_eq: curatelle_simple} },
        ]
      }){
        aggregate { count }
      }
      curatelle_simple_domicile_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlDomicile}
          { nature_mesure: {_eq: curatelle_simple} },
        ]
      }){
        aggregate { count }
      }
      
      tutelle_etablissement_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlEtalblissement}
          ${gqlTutelle}
        ]
      }){
        aggregate { count }
      }
      tutelle_etablissement_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlEtalblissement}
          ${gqlTutelle}
        ]
      }){
        aggregate { count }
      }
      tutelle_domicile_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlDomicile}
          ${gqlTutelle}
        ]
      }){
        aggregate { count }
      }
      tutelle_domicile_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlDomicile}
          ${gqlTutelle}
        ]
      }){
        aggregate { count }
      }

      accompagnement_judiciaire_etablissement_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlEtalblissement}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
        ]
      }){
        aggregate { count }
      }
      accompagnement_judiciaire_etablissement_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlEtalblissement}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
        ]
      }){
        aggregate { count }
      }
      accompagnement_judiciaire_domicile_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlDomicile}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
        ]
      }){
        aggregate { count }
      }
      accompagnement_judiciaire_domicile_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlDomicile}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
        ]
      }){
        aggregate { count }
      }

      curatelle_biens_etablissement_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }
      curatelle_biens_etablissement_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }
      curatelle_biens_domicile_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }
      curatelle_biens_domicile_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }

      curatelle_personne_etablissement_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }
      curatelle_personne_etablissement_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }
      curatelle_personne_domicile_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }
      curatelle_personne_domicile_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }

      subroge_tuteur_createur_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          { nature_mesure: {_eq: subroge_tuteur} },
        ]
      }){
        aggregate { count }
      }
      subroge_tuteur_createur_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          { nature_mesure: {_eq: subroge_tuteur} },
        ]
      }){
        aggregate { count }
      }

      sauvegarde_justice_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          { nature_mesure: {_eq: sauvegarde_justice} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          { nature_mesure: {_eq: sauvegarde_justice} },
        ]
      }){
        aggregate { count }
      }

      mandat_adhoc_majeur_debut_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu1erJanvier}
          { nature_mesure: {_eq: mesure_ad_hoc} },
        ]
      }){
        aggregate { count }
      }
      mandat_adhoc_majeur_fin_annee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlAu31Decembre}
          { nature_mesure: {_eq: mesure_ad_hoc} },
        ]
      }){
        aggregate { count }
      }

      curatelle_renforcee_etablissement_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: curatelle_renforcee} },
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      curatelle_renforcee_etablissement_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: curatelle_renforcee} },
          ${gqlEtalblissement}
        ]
      }){
        aggregate { count }
      }
      curatelle_renforcee_domicile_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: curatelle_renforcee} },
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      curatelle_renforcee_domicile_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: curatelle_renforcee} },
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      curatelle_simple_etablissement_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: curatelle_simple} },
          ${gqlEtalblissement}
        ]
      }){
        aggregate { count }
      }
      curatelle_simple_etablissement_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: curatelle_simple} },
          ${gqlEtalblissement}
        ]
      }){
        aggregate { count }
      }
      curatelle_simple_domicile_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: curatelle_simple} },
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      curatelle_simple_domicile_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: curatelle_simple} },
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      tutelle_etablissement_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          ${gqlTutelle}
          ${gqlEtalblissement}
        ]
      }){
        aggregate { count }
      }
      tutelle_etablissement_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          ${gqlTutelle}
          ${gqlEtalblissement}
        ]
      }){
        aggregate { count }
      }
      tutelle_domicile_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          ${gqlTutelle}
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      tutelle_domicile_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          ${gqlTutelle}
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      accompagnement_judiciaire_etablissement_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
          ${gqlEtalblissement}
        ]
      }){
        aggregate { count }
      }
      accompagnement_judiciaire_etablissement_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
          ${gqlEtalblissement}
        ]
      }){
        aggregate { count }
      }
      accompagnement_judiciaire_domicile_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      accompagnement_judiciaire_domicile_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
          ${gqlDomicile}
        ]
      }){
        aggregate { count }
      }
      curatelle_biens_etablissement_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }
      curatelle_biens_etablissement_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }
      curatelle_biens_domicile_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }
      curatelle_biens_domicile_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlBiens}
        ]
      }){
        aggregate { count }
      }
      curatelle_personne_etablissement_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }
      curatelle_personne_etablissement_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          ${gqlEtalblissement}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }
      curatelle_personne_domicile_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }
      curatelle_personne_domicile_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          ${gqlDomicile}
          ${gqlCuratelle}
          ${gqlPersonne}
        ]
      }){
        aggregate { count }
      }
      subroge_tuteur_createur_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: subroge_tuteur} },
        ]
      }){
        aggregate { count }
      }
      subroge_tuteur_createur_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: subroge_tuteur} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: sauvegarde_justice} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: sauvegarde_justice} },
        ]
      }){
        aggregate { count }
      }
      mandat_adhoc_majeur_mesures_nouvelles: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlNouvelles}
          { nature_mesure: {_eq: mesure_ad_hoc} },
        ]
      }){
        aggregate { count }
      }
      mandat_adhoc_majeur_sortie_mesures: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlSorties}
          { nature_mesure: {_eq: mesure_ad_hoc} },
        ]
      }){
        aggregate { count }
      }

      revisions_main_levee:  mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          { date_protection_en_cours: {_gte: $dateStart} },
          { date_protection_en_cours: {_lte: $dateEnd} },
          { resultat_revision: {_eq: mainlevee} },
        ]
      }){
        aggregate { count }
      }
      revisions_reconduction:  mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          { date_protection_en_cours: {_gte: $dateStart} },
          { date_protection_en_cours: {_lte: $dateEnd} },
          { resultat_revision: {_eq: reconduction} },
        ]
      }){
        aggregate { count }
      }
      revisions_changement:  mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          { date_protection_en_cours: {_gte: $dateStart} },
          { date_protection_en_cours: {_lte: $dateEnd} },
          ${gqlRevisionChangement}
        ]
      }){
        aggregate { count }
      }
      revisions_autre:  mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          { date_protection_en_cours: {_gte: $dateStart} },
          { date_protection_en_cours: {_lte: $dateEnd} },
          { resultat_revision: {_eq: allegement} },
          ${gqlRevisionAutre}
        ]
      }){
        aggregate { count }
      }
      sorties_main_levee:  mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          { date_fin_mesure: {_gte: $dateStart} },
          { date_fin_mesure: {_lte: $dateEnd} },
          { cause_sortie: {_eq: mainlevee} },
        ]
      }){
        aggregate { count }
      }
      sorties_deces:  mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          { date_fin_mesure: {_gte: $dateStart} },
          { date_fin_mesure: {_lte: $dateEnd} },
          { cause_sortie: {_eq: deces} },
        ]
      }){
        aggregate { count }
      }


      tutelle_age_inf_25_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_inf_25_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_25_39_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_25_39_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_40_59_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_40_59_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_60_74_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_60_74_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_sup_75_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_age_sup_75_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: tutelle} },
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_inf_25_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlCuratelle}
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_inf_25_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlCuratelle}
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_25_39_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_25_39_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_40_59_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_40_59_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_60_74_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_60_74_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_sup_75_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      curatelle_age_sup_75_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlCuratelle}
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_inf_25_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_inf_25_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_25_39_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_25_39_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_40_59_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_40_59_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_60_74_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_60_74_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_sup_75_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      maj_age_sup_75_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_inf_25_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_inf_25_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_25_39_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_25_39_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_40_59_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_40_59_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_60_74_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_60_74_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_sup_75_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_age_sup_75_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          { nature_mesure : {_eq: sauvegarde_justice} },
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_inf_25_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_inf_25_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_lt: $yearLess25 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_25_39_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_25_39_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess25 } },
          { annee_naissance: {_lte: $yearLess39 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_40_59_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_40_59_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess40 } },
          { annee_naissance: {_lte: $yearLess59 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_60_74_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_60_74_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess60 } },
          { annee_naissance: {_lte: $yearLess74 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_sup_75_ans_homme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: monsieur} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_age_sup_75_ans_femme: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { civilite : {_eq: madame} },
          ${gqlNatureMesureAutre}
          { annee_naissance: {_gte: $yearLess75 } },
        ]
      }){
        aggregate { count }
      }
      tutelle_anciennete_inf_1_an: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { date_nomination : {_gt: $dateYearLess1} },
        ]
      }){
        aggregate { count }
      }
      tutelle_anciennete_1_3_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { date_nomination : {_lte: $dateYearLess1} },
          { date_nomination : {_gte: $dateYearLess3} },
        ]
      }){
        aggregate { count }
      }
      tutelle_anciennete_3_5_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { date_nomination : {_lte: $dateYearLess3} },
          { date_nomination : {_gte: $dateYearLess5} },
        ]
      }){
        aggregate { count }
      }
      tutelle_anciennete_5_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { date_nomination : {_lte: $dateYearLess5} },
          { date_nomination : {_gte: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      tutelle_anciennete_sup_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { date_nomination : {_lt: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      curatelle_anciennete_inf_1_an: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { date_nomination : {_gt: $dateYearLess1} },
        ]
      }){
        aggregate { count }
      }
      curatelle_anciennete_1_3_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { date_nomination : {_lte: $dateYearLess1} },
          { date_nomination : {_gte: $dateYearLess3} },
        ]
      }){
        aggregate { count }
      }
      curatelle_anciennete_3_5_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { date_nomination : {_lte: $dateYearLess3} },
          { date_nomination : {_gte: $dateYearLess5} },
        ]
      }){
        aggregate { count }
      }
      curatelle_anciennete_5_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { date_nomination : {_lte: $dateYearLess5} },
          { date_nomination : {_gte: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      curatelle_anciennete_sup_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { date_nomination : {_lt: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      maj_anciennete_inf_1_an: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { date_nomination : {_gt: $dateYearLess1} },
        ]
      }){
        aggregate { count }
      }
      maj_anciennete_1_3_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { date_nomination : {_lte: $dateYearLess1} },
          { date_nomination : {_gte: $dateYearLess3} },
        ]
      }){
        aggregate { count }
      }
      maj_anciennete_3_5_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { date_nomination : {_lte: $dateYearLess3} },
          { date_nomination : {_gte: $dateYearLess5} },
        ]
      }){
        aggregate { count }
      }
      maj_anciennete_5_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { date_nomination : {_lte: $dateYearLess5} },
          { date_nomination : {_gte: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      maj_anciennete_sup_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { date_nomination : {_lt: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_anciennete_inf_1_an: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { date_nomination : {_gt: $dateYearLess1} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_anciennete_1_3_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { date_nomination : {_lte: $dateYearLess1} },
          { date_nomination : {_gte: $dateYearLess3} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_anciennete_3_5_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { date_nomination : {_lte: $dateYearLess3} },
          { date_nomination : {_gte: $dateYearLess5} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_anciennete_5_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { date_nomination : {_lte: $dateYearLess5} },
          { date_nomination : {_gte: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_anciennete_sup_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { date_nomination : {_lt: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_anciennete_inf_1_an: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { date_nomination : {_gt: $dateYearLess1} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_anciennete_1_3_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { date_nomination : {_lte: $dateYearLess1} },
          { date_nomination : {_gte: $dateYearLess3} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_anciennete_3_5_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { date_nomination : {_lte: $dateYearLess3} },
          { date_nomination : {_gte: $dateYearLess5} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_anciennete_5_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { date_nomination : {_lte: $dateYearLess5} },
          { date_nomination : {_gte: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_anciennete_sup_10_ans: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { date_nomination : {_lt: $dateYearLess10} },
        ]
      }){
        aggregate { count }
      }
      tutelle_etablissement_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { type_etablissement: {_eq: etablissement_handicapes} },

        ]
      }){
        aggregate { count }
      }
      tutelle_service_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      tutelle_autre_etablissement_personne_agee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { type_etablissement: {_eq: etablissement_personne_agee} },
        ]
      }){
        aggregate { count }
      }
      tutelle_chrs: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          ${gqlChrs}
        ]
      }){
        aggregate { count }
      }
      tutelle_service_hospitalier_soins_longue_duree: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { type_etablissement: {_eq: etablissement_hospitalier} },
        ]
      }){
        aggregate { count }
      }
      tutelle_service_psychiatrique: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { type_etablissement: {_eq: etablissement_psychiatrique} },
        ]
      }){
        aggregate { count }
      }
      tutelle_autre_service: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: tutelle} },
          { type_etablissement: {_eq: autre_etablissement} },
        ]
      }){
        aggregate { count }
      }
      curatelle_etablissement_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      curatelle_service_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      curatelle_autre_etablissement_personne_agee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { type_etablissement: {_eq: etablissement_personne_agee} },
        ]
      }){
        aggregate { count }
      }
      curatelle_chrs: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          ${gqlChrs}
        ]
      }){
        aggregate { count }
      }
      curatelle_service_hospitalier_soins_longue_duree: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { type_etablissement: {_eq: etablissement_hospitalier} },
        ]
      }){
        aggregate { count }
      }
      curatelle_service_psychiatrique: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { type_etablissement: {_eq: etablissement_psychiatrique} },
        ]
      }){
        aggregate { count }
      }
      curatelle_autre_service: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlCuratelle}
          { type_etablissement: {_eq: autre_etablissement} },
        ]
      }){
        aggregate { count }
      }
      maj_etablissement_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      maj_service_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      maj_autre_etablissement_personne_agee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { type_etablissement: {_eq: etablissement_personne_agee} },
        ]
      }){
        aggregate { count }
      }
      maj_chrs: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          ${gqlChrs}
        ]
      }){
        aggregate { count }
      }
      maj_service_hospitalier_soins_longue_duree: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { type_etablissement: {_eq: etablissement_hospitalier} },
        ]
      }){
        aggregate { count }
      }
      maj_service_psychiatrique: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { type_etablissement: {_eq: etablissement_psychiatrique} },
        ]
      }){
        aggregate { count }
      }
      maj_autre_service: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: mesure_accompagnement_judiciaire} },
          { type_etablissement: {_eq: autre_etablissement} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_etablissement_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_service_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_autre_etablissement_personne_agee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { type_etablissement: {_eq: etablissement_personne_agee} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_chrs: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          ${gqlChrs}
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_service_hospitalier_soins_longue_duree: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { type_etablissement: {_eq: etablissement_hospitalier} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_service_psychiatrique: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { type_etablissement: {_eq: etablissement_psychiatrique} },
        ]
      }){
        aggregate { count }
      }
      sauvegarde_justice_autre_service: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure : {_eq: sauvegarde_justice} },
          { type_etablissement: {_eq: autre_etablissement} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_etablissement_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_service_personne_handicapee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { type_etablissement: {_eq: etablissement_handicapes} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_autre_etablissement_personne_agee: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { type_etablissement: {_eq: etablissement_personne_agee} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_chrs: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          ${gqlChrs}
        ]
      }){
        aggregate { count }
      }
      autre_mesures_service_hospitalier_soins_longue_duree: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { type_etablissement: {_eq: etablissement_hospitalier} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_service_psychiatrique: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { type_etablissement: {_eq: etablissement_psychiatrique} },
        ]
      }){
        aggregate { count }
      }
      autre_mesures_autre_service: mesures_aggregate(where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre}
          { type_etablissement: {_eq: autre_etablissement} },
        ]
      }){
        aggregate { count }
      }
    
    }
  `,

  REVENUS: `
  query revenus(
    $mandataireId: Int!,
    $dateStart: date!,
    $dateEnd: date!,
    $maxTranche1: numeric!,
    $maxTranche2: numeric!,
    $maxTranche3: numeric!,
    $maxTranche4: numeric!,
    $maxTranche5: numeric!,
    $maxTranche6: numeric!,
    $maxTranche7: numeric!,
    $maxTranche8: numeric!,
    $maxTranche9: numeric!,
    $maxTranche10: numeric!
  ){
    tutelle_tranche1: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlTutelle}
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche1} } },
        ]
      }
    ){
      aggregate { count }
    }
    curatelle_simple_tranche1: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: curatelle_simple} },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche1} } },
        ]
      }
    ){
      aggregate { count }
    }
    curatelle_renforcee_tranche1: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: curatelle_renforcee} },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche1} } },
        ]
      }
    ){
      aggregate { count }
    }
    sauvegarde_autres_mesures_tranche1: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre2}
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche1} } },
        ]
      }
    ){
      aggregate { count }
    }
    maj_tranche1: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
          { mesure_ressources: { niveau_ressource: {_lte: $maxTranche1} } },
        ]
      }
    ){
      aggregate { count }
    }

    ${trancheFrom2To10}

    tutelle_tranche11: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlTutelle}
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche10} } },
        ]
      }
    ){
      aggregate { count }
    }
    curatelle_simple_tranche11: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: curatelle_simple} },
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche10} } },
        ]
      }
    ){
      aggregate { count }
    }
    curatelle_renforcee_tranche11: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: curatelle_renforcee} },
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche10} } },
        ]
      }
    ){
      aggregate { count }
    }
    sauvegarde_autres_mesures_tranche11: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          ${gqlNatureMesureAutre2}
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche10} } },
        ]
      }
    ){
      aggregate { count }
    }
    maj_tranche11: mesures_aggregate(
      where: {
        _and: [
          { mandataire_id : {_eq: $mandataireId} },
          ${gqlDu1erJanvierAu31Decembre}
          { nature_mesure: {_eq: mesure_accompagnement_judiciaire} },
          { mesure_ressources: { niveau_ressource: {_gt: $maxTranche10} } },
        ]
      }
    ){
      aggregate { count }
    }

  }
  `,
};
