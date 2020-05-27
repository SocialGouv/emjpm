import gql from "graphql-tag";

export const UPDATE_ENQUETE_POPULATIONS_AUTRE = gql`
  mutation update_enquete_populations_autre(
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
        autre_mesures_age_inf_25_ans_homme: $age_inf_25_ans_homme
        autre_mesures_age_inf_25_ans_femme: $age_inf_25_ans_femme
        autre_mesures_age_25_39_ans_homme: $age_25_39_ans_homme
        autre_mesures_age_25_39_ans_femme: $age_25_39_ans_femme
        autre_mesures_age_40_59_ans_homme: $age_40_59_ans_homme
        autre_mesures_age_40_59_ans_femme: $age_40_59_ans_femme
        autre_mesures_age_60_74_ans_homme: $age_60_74_ans_homme
        autre_mesures_age_60_74_ans_femme: $age_60_74_ans_femme
        autre_mesures_age_sup_75_ans_homme: $age_sup_75_ans_homme
        autre_mesures_age_sup_75_ans_femme: $age_sup_75_ans_femme
        autre_mesures_anciennete_inf_1_an: $anciennete_inf_1_an
        autre_mesures_anciennete_1_3_ans: $anciennete_1_3_ans
        autre_mesures_anciennete_3_5_ans: $anciennete_3_5_ans
        autre_mesures_anciennete_5_10_ans: $anciennete_5_10_ans
        autre_mesures_anciennete_sup_10_ans: $anciennete_sup_10_ans
        autre_mesures_etablissement_personne_handicapee: $type_etablissement_personne_handicapee
        autre_mesures_service_personne_handicapee: $type_service_personne_handicapee
        autre_mesures_ehpad: $type_ehpad
        autre_mesures_autre_etablissement_personne_agee: $type_autre_etablissement_personne_agee
        autre_mesures_chrs: $type_chrs
        autre_mesures_service_hospitalier_soins_longue_duree: $type_service_hospitalier_soins_longue_duree
        autre_mesures_service_psychiatrique: $type_service_psychiatrique
        autre_mesures_autre_service: $type_autre_service
      }
    ) {
      id
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

export const UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE = gql`
  mutation update_enquete_populations_sauvegarde_justice(
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
        sauvegarde_justice_age_inf_25_ans_homme: $age_inf_25_ans_homme
        sauvegarde_justice_age_inf_25_ans_femme: $age_inf_25_ans_femme
        sauvegarde_justice_age_25_39_ans_homme: $age_25_39_ans_homme
        sauvegarde_justice_age_25_39_ans_femme: $age_25_39_ans_femme
        sauvegarde_justice_age_40_59_ans_homme: $age_40_59_ans_homme
        sauvegarde_justice_age_40_59_ans_femme: $age_40_59_ans_femme
        sauvegarde_justice_age_60_74_ans_homme: $age_60_74_ans_homme
        sauvegarde_justice_age_60_74_ans_femme: $age_60_74_ans_femme
        sauvegarde_justice_age_sup_75_ans_homme: $age_sup_75_ans_homme
        sauvegarde_justice_age_sup_75_ans_femme: $age_sup_75_ans_femme
        sauvegarde_justice_anciennete_inf_1_an: $anciennete_inf_1_an
        sauvegarde_justice_anciennete_1_3_ans: $anciennete_1_3_ans
        sauvegarde_justice_anciennete_3_5_ans: $anciennete_3_5_ans
        sauvegarde_justice_anciennete_5_10_ans: $anciennete_5_10_ans
        sauvegarde_justice_anciennete_sup_10_ans: $anciennete_sup_10_ans
        sauvegarde_justice_etablissement_personne_handicapee: $type_etablissement_personne_handicapee
        sauvegarde_justice_service_personne_handicapee: $type_service_personne_handicapee
        sauvegarde_justice_ehpad: $type_ehpad
        sauvegarde_justice_autre_etablissement_personne_agee: $type_autre_etablissement_personne_agee
        sauvegarde_justice_chrs: $type_chrs
        sauvegarde_justice_service_hospitalier_soins_longue_duree: $type_service_hospitalier_soins_longue_duree
        sauvegarde_justice_service_psychiatrique: $type_service_psychiatrique
        sauvegarde_justice_autre_service: $type_autre_service
      }
    ) {
      id
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

export const UPDATE_ENQUETE_POPULATIONS_MAJ = gql`
  mutation update_enquete_populations_maj(
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
        maj_age_inf_25_ans_homme: $age_inf_25_ans_homme
        maj_age_inf_25_ans_femme: $age_inf_25_ans_femme
        maj_age_25_39_ans_homme: $age_25_39_ans_homme
        maj_age_25_39_ans_femme: $age_25_39_ans_femme
        maj_age_40_59_ans_homme: $age_40_59_ans_homme
        maj_age_40_59_ans_femme: $age_40_59_ans_femme
        maj_age_60_74_ans_homme: $age_60_74_ans_homme
        maj_age_60_74_ans_femme: $age_60_74_ans_femme
        maj_age_sup_75_ans_homme: $age_sup_75_ans_homme
        maj_age_sup_75_ans_femme: $age_sup_75_ans_femme
        maj_anciennete_inf_1_an: $anciennete_inf_1_an
        maj_anciennete_1_3_ans: $anciennete_1_3_ans
        maj_anciennete_3_5_ans: $anciennete_3_5_ans
        maj_anciennete_5_10_ans: $anciennete_5_10_ans
        maj_anciennete_sup_10_ans: $anciennete_sup_10_ans
        maj_etablissement_personne_handicapee: $type_etablissement_personne_handicapee
        maj_service_personne_handicapee: $type_service_personne_handicapee
        maj_ehpad: $type_ehpad
        maj_autre_etablissement_personne_agee: $type_autre_etablissement_personne_agee
        maj_chrs: $type_chrs
        maj_service_hospitalier_soins_longue_duree: $type_service_hospitalier_soins_longue_duree
        maj_service_psychiatrique: $type_service_psychiatrique
        maj_autre_service: $type_autre_service
      }
    ) {
      id
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

export const UPDATE_ENQUETE_POPULATIONS_TUTELLE = gql`
  mutation update_enquete_populations_tutelle(
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
        tutelle_age_inf_25_ans_homme: $age_inf_25_ans_homme
        tutelle_age_inf_25_ans_femme: $age_inf_25_ans_femme
        tutelle_age_25_39_ans_homme: $age_25_39_ans_homme
        tutelle_age_25_39_ans_femme: $age_25_39_ans_femme
        tutelle_age_40_59_ans_homme: $age_40_59_ans_homme
        tutelle_age_40_59_ans_femme: $age_40_59_ans_femme
        tutelle_age_60_74_ans_homme: $age_60_74_ans_homme
        tutelle_age_60_74_ans_femme: $age_60_74_ans_femme
        tutelle_age_sup_75_ans_homme: $age_sup_75_ans_homme
        tutelle_age_sup_75_ans_femme: $age_sup_75_ans_femme
        tutelle_anciennete_inf_1_an: $anciennete_inf_1_an
        tutelle_anciennete_1_3_ans: $anciennete_1_3_ans
        tutelle_anciennete_3_5_ans: $anciennete_3_5_ans
        tutelle_anciennete_5_10_ans: $anciennete_5_10_ans
        tutelle_anciennete_sup_10_ans: $anciennete_sup_10_ans
        tutelle_etablissement_personne_handicapee: $type_etablissement_personne_handicapee
        tutelle_service_personne_handicapee: $type_service_personne_handicapee
        tutelle_ehpad: $type_ehpad
        tutelle_autre_etablissement_personne_agee: $type_autre_etablissement_personne_agee
        tutelle_chrs: $type_chrs
        tutelle_service_hospitalier_soins_longue_duree: $type_service_hospitalier_soins_longue_duree
        tutelle_service_psychiatrique: $type_service_psychiatrique
        tutelle_autre_service: $type_autre_service
      }
    ) {
      id
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
