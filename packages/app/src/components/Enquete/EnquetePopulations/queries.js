import gql from "graphql-tag";

export const ENQUETE_REPONSE_POPULATIONS_CURATELLE = gql`
  query enquete_reponses_populations_curatelle($id: Int!) {
    enquete_reponses_populations_by_pk(id: $id) {
      id
      created_at
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
      curatelle_anciennete_inf_1_an
      curatelle_anciennete_1_3_ans
      curatelle_anciennete_3_5_ans
      curatelle_anciennete_5_10_ans
      curatelle_anciennete_sup_10_ans
      curatelle_etablissement_personne_handicapee
      curatelle_service_personne_handicapee
      curatelle_ehpad
      curatelle_autre_etablissement_personne_agee
      curatelle_chrs
      curatelle_service_hospitalier_soins_longue_duree
      curatelle_service_psychiatrique
      curatelle_autre_service
    }
  }
`;

export const ENQUETE_REPONSE_POPULATIONS_TUTELLE = gql`
  query enquete_reponses_populations_tutelle($id: Int!) {
    enquete_reponses_populations_by_pk(id: $id) {
      id
      created_at
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
      tutelle_anciennete_inf_1_an
      tutelle_anciennete_1_3_ans
      tutelle_anciennete_3_5_ans
      tutelle_anciennete_5_10_ans
      tutelle_anciennete_sup_10_ans
      tutelle_etablissement_personne_handicapee
      tutelle_service_personne_handicapee
      tutelle_ehpad
      tutelle_autre_etablissement_personne_agee
      tutelle_chrs
      tutelle_service_hospitalier_soins_longue_duree
      tutelle_service_psychiatrique
      tutelle_autre_service
    }
  }
`;

export const ENQUETE_REPONSE_POPULATIONS_MAJ = gql`
  query enquete_reponses_populations_maj($id: Int!) {
    enquete_reponses_populations_by_pk(id: $id) {
      id
      created_at
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
      maj_anciennete_inf_1_an
      maj_anciennete_1_3_ans
      maj_anciennete_3_5_ans
      maj_anciennete_5_10_ans
      maj_anciennete_sup_10_ans
      maj_etablissement_personne_handicapee
      maj_service_personne_handicapee
      maj_ehpad
      maj_autre_etablissement_personne_agee
      maj_chrs
      maj_service_hospitalier_soins_longue_duree
      maj_service_psychiatrique
      maj_autre_service
    }
  }
`;

export const ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE = gql`
  query enquete_reponses_populations_sauvegarde_justice($id: Int!) {
    enquete_reponses_populations_by_pk(id: $id) {
      id
      created_at
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
      sauvegarde_justice_anciennete_inf_1_an
      sauvegarde_justice_anciennete_1_3_ans
      sauvegarde_justice_anciennete_3_5_ans
      sauvegarde_justice_anciennete_5_10_ans
      sauvegarde_justice_anciennete_sup_10_ans
      sauvegarde_justice_etablissement_personne_handicapee
      sauvegarde_justice_service_personne_handicapee
      sauvegarde_justice_ehpad
      sauvegarde_justice_autre_etablissement_personne_agee
      sauvegarde_justice_chrs
      sauvegarde_justice_service_hospitalier_soins_longue_duree
      sauvegarde_justice_service_psychiatrique
      sauvegarde_justice_autre_service
    }
  }
`;

export const ENQUETE_REPONSE_POPULATIONS_AUTRE = gql`
  query enquete_reponses_populations_autre($id: Int!) {
    enquete_reponses_populations_by_pk(id: $id) {
      id
      created_at
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
      autre_mesures_etablissement_personne_handicapee
      autre_mesures_service_personne_handicapee
      autre_mesures_ehpad
      autre_mesures_autre_etablissement_personne_agee
      autre_mesures_chrs
      autre_mesures_service_hospitalier_soins_longue_duree
      autre_mesures_service_psychiatrique
      autre_mesures_autre_service
    }
  }
`;
