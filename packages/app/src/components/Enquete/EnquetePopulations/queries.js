import gql from "graphql-tag";
// prefix: 'curatelle' | 'tutelle' | 'maj' | 'sauvegarde_justice' | 'autre_mesures'
function buildEnquetePopulationQuery(prefix) {
  return gql`
  query enquete_reponses_populations_${prefix}($id: Int!) {
    enquete_reponses_populations_by_pk(id: $id) {
      id
      created_at
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

export const ENQUETE_REPONSE_POPULATIONS_CURATELLE = buildEnquetePopulationQuery("curatelle");

export const ENQUETE_REPONSE_POPULATIONS_TUTELLE = buildEnquetePopulationQuery("tutelle");

export const ENQUETE_REPONSE_POPULATIONS_MAJ = buildEnquetePopulationQuery("maj");

export const ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE = buildEnquetePopulationQuery(
  "sauvegarde_justice"
);

export const ENQUETE_REPONSE_POPULATIONS_AUTRE = buildEnquetePopulationQuery("autre_mesures");
