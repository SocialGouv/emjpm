import yup from "~/lib/validationSchemas/yup";

// schema identique à enquetePopulationsSchema (côté hasura actions)
export const enquetePopulationsSchema = yup.object().shape({
  age_25_39_ans_femme: yup.number().min(0).nullable(),
  age_25_39_ans_homme: yup.number().min(0).nullable(),
  age_40_59_ans_femme: yup.number().min(0).nullable(),
  age_40_59_ans_homme: yup.number().min(0).nullable(),
  age_60_74_ans_femme: yup.number().min(0).nullable(),
  age_60_74_ans_homme: yup.number().min(0).nullable(),
  age_inf_25_ans_femme: yup.number().min(0).nullable(),
  age_inf_25_ans_homme: yup.number().min(0).nullable(),
  age_sup_75_ans_femme: yup.number().min(0).nullable(),
  age_sup_75_ans_homme: yup.number().min(0).nullable(),
  anciennete_1_3_ans: yup.number().min(0).nullable(),
  anciennete_3_5_ans: yup.number().min(0).nullable(),
  anciennete_5_10_ans: yup.number().min(0).nullable(),
  anciennete_inf_1_an: yup.number().min(0).nullable(),
  anciennete_sup_10_ans: yup.number().min(0).nullable(),
  autre_etablissement_personne_agee: yup.number().min(0).nullable(),
  autre_service: yup.number().min(0).nullable(),
  chrs: yup.number().min(0).nullable(),
  ehpad: yup.number().min(0).nullable(),
  etablissement_personne_handicapee: yup.number().min(0).nullable(),
  service_hospitalier_soins_longue_duree: yup.number().min(0).nullable(),
  service_personne_handicapee: yup.number().min(0).nullable(),
  service_psychiatrique: yup.number().min(0).nullable(),
});

export default enquetePopulationsSchema;
