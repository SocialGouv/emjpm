import gql from "graphql-tag";

// prefix: 'curatelle' | 'tutelle' | 'maj' | 'sauvegarde_justice' | 'autre_mesures'
function buildEnquetePopulationMutation(prefix) {
  return gql`
    mutation update_enquete_populations_${prefix}(
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
      $etablissement_personne_handicapee: Int
      $service_personne_handicapee: Int
      $ehpad: Int
      $autre_etablissement_personne_agee: Int
      $chrs: Int
      $service_hospitalier_soins_longue_duree: Int
      $service_psychiatrique: Int
      $autre_service: Int
    ) {
      update_enquete_reponses_populations_by_pk(
        pk_columns: { id: $id }
        _set: {
          ${prefix}_age_inf_25_ans_homme: $age_inf_25_ans_homme
          ${prefix}_age_inf_25_ans_femme: $age_inf_25_ans_femme
          ${prefix}_age_25_39_ans_homme: $age_25_39_ans_homme
          ${prefix}_age_25_39_ans_femme: $age_25_39_ans_femme
          ${prefix}_age_40_59_ans_homme: $age_40_59_ans_homme
          ${prefix}_age_40_59_ans_femme: $age_40_59_ans_femme
          ${prefix}_age_60_74_ans_homme: $age_60_74_ans_homme
          ${prefix}_age_60_74_ans_femme: $age_60_74_ans_femme
          ${prefix}_age_sup_75_ans_homme: $age_sup_75_ans_homme
          ${prefix}_age_sup_75_ans_femme: $age_sup_75_ans_femme
          ${prefix}_anciennete_inf_1_an: $anciennete_inf_1_an
          ${prefix}_anciennete_1_3_ans: $anciennete_1_3_ans
          ${prefix}_anciennete_3_5_ans: $anciennete_3_5_ans
          ${prefix}_anciennete_5_10_ans: $anciennete_5_10_ans
          ${prefix}_anciennete_sup_10_ans: $anciennete_sup_10_ans
          ${prefix}_etablissement_personne_handicapee: $etablissement_personne_handicapee
          ${prefix}_service_personne_handicapee: $service_personne_handicapee
          ${prefix}_ehpad: $ehpad
          ${prefix}_autre_etablissement_personne_agee: $autre_etablissement_personne_agee
          ${prefix}_chrs: $chrs
          ${prefix}_service_hospitalier_soins_longue_duree: $service_hospitalier_soins_longue_duree
          ${prefix}_service_psychiatrique: $service_psychiatrique
          ${prefix}_autre_service: $autre_service
        }
      ) {
        id
        ${prefix}_age_inf_25_ans_homme
        ${prefix}_age_inf_25_ans_femme
        ${prefix}_age_25_39_ans_homme
        ${prefix}_age_25_39_ans_femme
        ${prefix}_age_40_59_ans_homme
        ${prefix}_age_40_59_ans_femme
        ${prefix}_age_60_74_ans_homme
        ${prefix}_age_60_74_ans_femme
        ${prefix}_age_sup_75_ans_homme
        ${prefix}_age_sup_75_ans_femme
        ${prefix}_anciennete_inf_1_an
        ${prefix}_anciennete_1_3_ans
        ${prefix}_anciennete_3_5_ans
        ${prefix}_anciennete_5_10_ans
        ${prefix}_anciennete_sup_10_ans
        ${prefix}_etablissement_personne_handicapee
        ${prefix}_service_personne_handicapee
        ${prefix}_ehpad
        ${prefix}_autre_etablissement_personne_agee
        ${prefix}_chrs
        ${prefix}_service_hospitalier_soins_longue_duree
        ${prefix}_service_psychiatrique
        ${prefix}_autre_service
      }
    }
  `;
}

export const UPDATE_ENQUETE_POPULATIONS_CURATELLE = buildEnquetePopulationMutation("curatelle");
export const UPDATE_ENQUETE_POPULATIONS_TUTELLE = buildEnquetePopulationMutation("tutelle");
export const UPDATE_ENQUETE_POPULATIONS_MAJ = buildEnquetePopulationMutation("maj");
export const UPDATE_ENQUETE_POPULATIONS_AUTRE = buildEnquetePopulationMutation("autre_mesures");
export const UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE = buildEnquetePopulationMutation(
  "sauvegarde_justice"
);
