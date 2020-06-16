const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    tutelle_age_inf_25_ans_homme: parser.integer(ws["C8"]),
    tutelle_age_inf_25_ans_femme: parser.integer(ws["C9"]),
    tutelle_age_25_39_ans_homme: parser.integer(ws["D8"]),
    tutelle_age_25_39_ans_femme: parser.integer(ws["D9"]),
    tutelle_age_40_59_ans_homme: parser.integer(ws["E8"]),
    tutelle_age_40_59_ans_femme: parser.integer(ws["E9"]),
    tutelle_age_60_74_ans_homme: parser.integer(ws["F8"]),
    tutelle_age_60_74_ans_femme: parser.integer(ws["F9"]),
    tutelle_age_sup_75_ans_homme: parser.integer(ws["G8"]),
    tutelle_age_sup_75_ans_femme: parser.integer(ws["G9"]),

    curatelle_age_inf_25_ans_homme: parser.integer(ws["C10"]),
    curatelle_age_inf_25_ans_femme: parser.integer(ws["C11"]),
    curatelle_age_25_39_ans_homme: parser.integer(ws["D10"]),
    curatelle_age_25_39_ans_femme: parser.integer(ws["D11"]),
    curatelle_age_40_59_ans_homme: parser.integer(ws["E10"]),
    curatelle_age_40_59_ans_femme: parser.integer(ws["E11"]),
    curatelle_age_60_74_ans_homme: parser.integer(ws["F10"]),
    curatelle_age_60_74_ans_femme: parser.integer(ws["F11"]),
    curatelle_age_sup_75_ans_homme: parser.integer(ws["G10"]),
    curatelle_age_sup_75_ans_femme: parser.integer(ws["G11"]),

    maj_age_inf_25_ans_homme: parser.integer(ws["C12"]),
    maj_age_inf_25_ans_femme: parser.integer(ws["C13"]),
    maj_age_25_39_ans_homme: parser.integer(ws["D12"]),
    maj_age_25_39_ans_femme: parser.integer(ws["D13"]),
    maj_age_40_59_ans_homme: parser.integer(ws["E12"]),
    maj_age_40_59_ans_femme: parser.integer(ws["E13"]),
    maj_age_60_74_ans_homme: parser.integer(ws["F12"]),
    maj_age_60_74_ans_femme: parser.integer(ws["F13"]),
    maj_age_sup_75_ans_homme: parser.integer(ws["G12"]),
    maj_age_sup_75_ans_femme: parser.integer(ws["G13"]),

    sauvegarde_justice_age_inf_25_ans_homme: parser.integer(ws["C14"]),
    sauvegarde_justice_age_inf_25_ans_femme: parser.integer(ws["C15"]),
    sauvegarde_justice_age_25_39_ans_homme: parser.integer(ws["D14"]),
    sauvegarde_justice_age_25_39_ans_femme: parser.integer(ws["D15"]),
    sauvegarde_justice_age_40_59_ans_homme: parser.integer(ws["E14"]),
    sauvegarde_justice_age_40_59_ans_femme: parser.integer(ws["E15"]),
    sauvegarde_justice_age_60_74_ans_homme: parser.integer(ws["F14"]),
    sauvegarde_justice_age_60_74_ans_femme: parser.integer(ws["F15"]),
    sauvegarde_justice_age_sup_75_ans_homme: parser.integer(ws["G14"]),
    sauvegarde_justice_age_sup_75_ans_femme: parser.integer(ws["G15"]),

    autre_mesures_age_inf_25_ans_homme: parser.integer(ws["C16"]),
    autre_mesures_age_inf_25_ans_femme: parser.integer(ws["C17"]),
    autre_mesures_age_25_39_ans_homme: parser.integer(ws["D16"]),
    autre_mesures_age_25_39_ans_femme: parser.integer(ws["D17"]),
    autre_mesures_age_40_59_ans_homme: parser.integer(ws["E16"]),
    autre_mesures_age_40_59_ans_femme: parser.integer(ws["E17"]),
    autre_mesures_age_60_74_ans_homme: parser.integer(ws["F16"]),
    autre_mesures_age_60_74_ans_femme: parser.integer(ws["F17"]),
    autre_mesures_age_sup_75_ans_homme: parser.integer(ws["G16"]),
    autre_mesures_age_sup_75_ans_femme: parser.integer(ws["G17"]),

    tutelle_anciennete_inf_1_an: parser.integer(ws["B26"]),
    tutelle_anciennete_1_3_ans: parser.integer(ws["C26"]),
    tutelle_anciennete_3_5_ans: parser.integer(ws["D26"]),
    tutelle_anciennete_5_10_ans: parser.integer(ws["E26"]),
    tutelle_anciennete_sup_10_ans: parser.integer(ws["F26"]),

    curatelle_anciennete_inf_1_an: parser.integer(ws["B27"]),
    curatelle_anciennete_1_3_ans: parser.integer(ws["C27"]),
    curatelle_anciennete_3_5_ans: parser.integer(ws["D27"]),
    curatelle_anciennete_5_10_ans: parser.integer(ws["E27"]),
    curatelle_anciennete_sup_10_ans: parser.integer(ws["F27"]),

    maj_anciennete_inf_1_an: parser.integer(ws["B28"]),
    maj_anciennete_1_3_ans: parser.integer(ws["C28"]),
    maj_anciennete_3_5_ans: parser.integer(ws["D28"]),
    maj_anciennete_5_10_ans: parser.integer(ws["E28"]),
    maj_anciennete_sup_10_ans: parser.integer(ws["F28"]),

    sauvegarde_justice_anciennete_inf_1_an: parser.integer(ws["B29"]),
    sauvegarde_justice_anciennete_1_3_ans: parser.integer(ws["C29"]),
    sauvegarde_justice_anciennete_3_5_ans: parser.integer(ws["D29"]),
    sauvegarde_justice_anciennete_5_10_ans: parser.integer(ws["E29"]),
    sauvegarde_justice_anciennete_sup_10_ans: parser.integer(ws["F29"]),

    autre_mesures_anciennete_inf_1_an: parser.integer(ws["B30"]),
    autre_mesures_anciennete_1_3_ans: parser.integer(ws["C30"]),
    autre_mesures_anciennete_3_5_ans: parser.integer(ws["D30"]),
    autre_mesures_anciennete_5_10_ans: parser.integer(ws["E30"]),
    autre_mesures_anciennete_sup_10_ans: parser.integer(ws["F30"]),

    tutelle_etablissement_personne_handicapee: parser.integer(ws["C37"]),
    tutelle_service_personne_handicapee: parser.integer(ws["C38"]),
    tutelle_ehpad: parser.integer(ws["C40"]),
    tutelle_autre_etablissement_personne_agee: parser.integer(ws["C41"]),
    tutelle_chrs: parser.integer(ws["C43"]),
    tutelle_service_hospitalier_soins_longue_duree: parser.integer(ws["C44"]),
    tutelle_service_psychiatrique: parser.integer(ws["C45"]),
    tutelle_autre_service: parser.integer(ws["C46"]),

    curatelle_etablissement_personne_handicapee: parser.integer(ws["D37"]),
    curatelle_service_personne_handicapee: parser.integer(ws["D38"]),
    curatelle_ehpad: parser.integer(ws["D40"]),
    curatelle_autre_etablissement_personne_agee: parser.integer(ws["D41"]),
    curatelle_chrs: parser.integer(ws["D43"]),
    curatelle_service_hospitalier_soins_longue_duree: parser.integer(ws["D44"]),
    curatelle_service_psychiatrique: parser.integer(ws["D45"]),
    curatelle_autre_service: parser.integer(ws["D46"]),

    maj_etablissement_personne_handicapee: parser.integer(ws["E37"]),
    maj_service_personne_handicapee: parser.integer(ws["E38"]),
    maj_ehpad: parser.integer(ws["E40"]),
    maj_autre_etablissement_personne_agee: parser.integer(ws["E41"]),
    maj_chrs: parser.integer(ws["E43"]),
    maj_service_hospitalier_soins_longue_duree: parser.integer(ws["E44"]),
    maj_service_psychiatrique: parser.integer(ws["E45"]),
    maj_autre_service: parser.integer(ws["E46"]),

    sauvegarde_justice_etablissement_personne_handicapee: parser.integer(
      ws["F37"]
    ),
    sauvegarde_justice_service_personne_handicapee: parser.integer(ws["F38"]),
    sauvegarde_justice_ehpad: parser.integer(ws["F40"]),
    sauvegarde_justice_autre_etablissement_personne_agee: parser.integer(
      ws["F41"]
    ),
    sauvegarde_justice_chrs: parser.integer(ws["F43"]),
    sauvegarde_justice_service_hospitalier_soins_longue_duree: parser.integer(
      ws["F44"]
    ),
    sauvegarde_justice_service_psychiatrique: parser.integer(ws["F45"]),
    sauvegarde_justice_autre_service: parser.integer(ws["F46"]),

    autre_mesures_etablissement_personne_handicapee: parser.integer(ws["G37"]),
    autre_mesures_service_personne_handicapee: parser.integer(ws["G38"]),
    autre_mesures_ehpad: parser.integer(ws["G40"]),
    autre_mesures_autre_etablissement_personne_agee: parser.integer(ws["G41"]),
    autre_mesures_chrs: parser.integer(ws["G43"]),
    autre_mesures_service_hospitalier_soins_longue_duree: parser.integer(
      ws["G44"]
    ),
    autre_mesures_service_psychiatrique: parser.integer(ws["G45"]),
    autre_mesures_autre_service: parser.integer(ws["G46"]),
  };
}

module.exports = {
  parse,
};
