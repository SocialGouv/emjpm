import gql from "graphql-tag";

export const ENQUETE_INDIVIDUEL_RESPONSE = gql`
  query enquete_individuel_reponse($enqueteId: Int!, $mandataireId: Int!) {
    enqueteIndividuel(enqueteId: $enqueteId, mandataireId: $mandataireId) {
      enquete_reponse_id
      enquete_individuel_id
      mandataire_id
      informations {
        annee_agrement
        annee_debut_activite
        cnc_dpf_annee_obtention
        cnc_dpf_heure_formation
        cnc_maj_annee_obtention
        cnc_maj_heure_formation
        cnc_mjpm_annee_obtention
        cnc_mjpm_heure_formation
        cumul_delegue_service
        cumul_delegue_service_etp
        cumul_prepose
        cumul_prepose_etp
        debut_activite_avant_2009
        estimation_etp
        niveau_qualification
        niveau_qualification_secretaire_spe
        secretaire_specialise
        secretaire_specialise_etp
      }
      activite {
        curatelle_renforcee_etablissement_debut_annee
        curatelle_renforcee_etablissement_fin_annee
        curatelle_renforcee_domicile_debut_annee
        curatelle_renforcee_domicile_fin_annee
        curatelle_simple_etablissement_debut_annee
        curatelle_simple_etablissement_fin_annee
        curatelle_simple_domicile_debut_annee
        curatelle_simple_domicile_fin_annee
        tutelle_etablissement
        tutelle_domicile
        accompagnement_judiciaire_etablissement
        accompagnement_judiciaire_domicile
        curatelle_biens_etablissement
        curatelle_biens_domicile
        curatelle_personne_etablissement
        curatelle_personne_domicile
        revisions_main_levee
        revisions_masp
        revisions_reconduction
        revisions_changement
        revisions_autre
        sorties_main_levee
        sorties_deces
        sorties_masp
      }
    }
  }
`;
