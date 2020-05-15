import gql from "graphql-tag";

export const UPDATE_ENQUETE_POPULATIONS_CURATELLE = gql`
  mutation update_enquete_populations_curatelle(
    $id: Int!
    $age_inf_25_ans_homme: Int
    $age_inf_25_ans_femme: Int
    $age_25_39_ans_homme: Int
    $age_25_39_ans_femme: Int
    $age_40_59_ans_homme: Int
    $age_40_59_ans_femme: Int
    $age_60_74_ans_homme: Int
    $age_60_74_ans_femme: Int
    $age_sup_75_ans_homme: Int
    $age_sup_75_ans_femme: Int
    $anciennete_inf_1_an: Int
    $anciennete_1_3_ans: Int
    $anciennete_3_5_ans: Int
    $anciennete_5_10_ans: Int
    $anciennete_sup_10_ans: Int
    $type_etablissement_personne_handicapee: Int
    $type_service_personne_handicapee: Int
    $type_ehpad: Int
    $type_autre_etablissement_personne_agee: Int
    $type_chrs: Int
    $type_service_hospitalier_soins_longue_duree: Int
    $type_service_psychiatrique: Int
    $type_autre_service: Int
  ) {
    update_enquete_reponses_populations_by_pk(
      pk_columns: { id: $id }
      _set: {
        curatelle_age_inf_25_ans_homme: $age_inf_25_ans_homme
        curatelle_age_inf_25_ans_femme: $age_inf_25_ans_femme
        curatelle_age_25_39_ans_homme: $age_25_39_ans_homme
        curatelle_age_25_39_ans_femme: $age_25_39_ans_femme
        curatelle_age_40_59_ans_homme: $age_40_59_ans_homme
        curatelle_age_40_59_ans_femme: $age_40_59_ans_femme
        curatelle_age_60_74_ans_homme: $age_60_74_ans_homme
        curatelle_age_60_74_ans_femme: $age_60_74_ans_femme
        curatelle_age_sup_75_ans_homme: $age_sup_75_ans_homme
        curatelle_age_sup_75_ans_femme: $age_sup_75_ans_femme
        curatelle_anciennete_inf_1_an: $anciennete_inf_1_an
        curatelle_anciennete_1_3_ans: $anciennete_1_3_ans
        curatelle_anciennete_3_5_ans: $anciennete_3_5_ans
        curatelle_anciennete_5_10_ans: $anciennete_5_10_ans
        curatelle_anciennete_sup_10_ans: $anciennete_sup_10_ans
        curatelle_etablissement_personne_handicapee: $type_etablissement_personne_handicapee
        curatelle_service_personne_handicapee: $type_service_personne_handicapee
        curatelle_ehpad: $type_ehpad
        curatelle_autre_etablissement_personne_agee: $type_autre_etablissement_personne_agee
        curatelle_chrs: $type_chrs
        curatelle_service_hospitalier_soins_longue_duree: $type_service_hospitalier_soins_longue_duree
        curatelle_service_psychiatrique: $type_service_psychiatrique
        curatelle_autre_service: $type_autre_service
      }
    ) {
      id
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
