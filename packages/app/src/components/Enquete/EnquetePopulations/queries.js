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
