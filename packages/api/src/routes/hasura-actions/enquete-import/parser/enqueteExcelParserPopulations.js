var HttpError = require("../../../../utils/error/HttpError");
const logger = require("../../../../utils/logger");
const excelParser = require("./enqueteExcelParserUtil");

function parse(worksheet) {
  console.log('worksheet["G9"]', worksheet["G9"]);

  try {
    const rawData = {
      tutelle_age_inf_25_ans_homme: excelParser.number(worksheet["C8"]),
      tutelle_age_inf_25_ans_femme: excelParser.number(worksheet["C9"]),
      tutelle_age_25_39_ans_homme: excelParser.number(worksheet["D8"]),
      tutelle_age_25_39_ans_femme: excelParser.number(worksheet["D9"]),
      tutelle_age_40_59_ans_homme: excelParser.number(worksheet["E8"]),
      tutelle_age_40_59_ans_femme: excelParser.number(worksheet["E9"]),
      tutelle_age_60_74_ans_homme: excelParser.number(worksheet["F8"]),
      tutelle_age_60_74_ans_femme: excelParser.number(worksheet["F9"]),
      tutelle_age_sup_75_ans_homme: excelParser.number(worksheet["G8"]),
      tutelle_age_sup_75_ans_femme: excelParser.number(worksheet["G9"]),

      curatelle_age_inf_25_ans_homme: excelParser.number(worksheet["C10"]),
      curatelle_age_inf_25_ans_femme: excelParser.number(worksheet["C11"]),
      curatelle_age_25_39_ans_homme: excelParser.number(worksheet["D10"]),
      curatelle_age_25_39_ans_femme: excelParser.number(worksheet["D11"]),
      curatelle_age_40_59_ans_homme: excelParser.number(worksheet["E10"]),
      curatelle_age_40_59_ans_femme: excelParser.number(worksheet["E11"]),
      curatelle_age_60_74_ans_homme: excelParser.number(worksheet["F10"]),
      curatelle_age_60_74_ans_femme: excelParser.number(worksheet["F11"]),
      curatelle_age_sup_75_ans_homme: excelParser.number(worksheet["G10"]),
      curatelle_age_sup_75_ans_femme: excelParser.number(worksheet["G11"]),

      maj_age_inf_25_ans_homme: excelParser.number(worksheet["C12"]),
      maj_age_inf_25_ans_femme: excelParser.number(worksheet["C13"]),
      maj_age_25_39_ans_homme: excelParser.number(worksheet["D12"]),
      maj_age_25_39_ans_femme: excelParser.number(worksheet["D13"]),
      maj_age_40_59_ans_homme: excelParser.number(worksheet["E12"]),
      maj_age_40_59_ans_femme: excelParser.number(worksheet["E13"]),
      maj_age_60_74_ans_homme: excelParser.number(worksheet["F12"]),
      maj_age_60_74_ans_femme: excelParser.number(worksheet["F13"]),
      maj_age_sup_75_ans_homme: excelParser.number(worksheet["G12"]),
      maj_age_sup_75_ans_femme: excelParser.number(worksheet["G13"]),

      sauvegarde_justice_age_inf_25_ans_homme: excelParser.number(
        worksheet["C14"]
      ),
      sauvegarde_justice_age_inf_25_ans_femme: excelParser.number(
        worksheet["C15"]
      ),
      sauvegarde_justice_age_25_39_ans_homme: excelParser.number(
        worksheet["D14"]
      ),
      sauvegarde_justice_age_25_39_ans_femme: excelParser.number(
        worksheet["D15"]
      ),
      sauvegarde_justice_age_40_59_ans_homme: excelParser.number(
        worksheet["E14"]
      ),
      sauvegarde_justice_age_40_59_ans_femme: excelParser.number(
        worksheet["E15"]
      ),
      sauvegarde_justice_age_60_74_ans_homme: excelParser.number(
        worksheet["F14"]
      ),
      sauvegarde_justice_age_60_74_ans_femme: excelParser.number(
        worksheet["F15"]
      ),
      sauvegarde_justice_age_sup_75_ans_homme: excelParser.number(
        worksheet["G14"]
      ),
      sauvegarde_justice_age_sup_75_ans_femme: excelParser.number(
        worksheet["G15"]
      ),

      autre_mesures_age_inf_25_ans_homme: excelParser.number(worksheet["C16"]),
      autre_mesures_age_inf_25_ans_femme: excelParser.number(worksheet["C17"]),
      autre_mesures_age_25_39_ans_homme: excelParser.number(worksheet["D16"]),
      autre_mesures_age_25_39_ans_femme: excelParser.number(worksheet["D17"]),
      autre_mesures_age_40_59_ans_homme: excelParser.number(worksheet["E16"]),
      autre_mesures_age_40_59_ans_femme: excelParser.number(worksheet["E17"]),
      autre_mesures_age_60_74_ans_homme: excelParser.number(worksheet["F16"]),
      autre_mesures_age_60_74_ans_femme: excelParser.number(worksheet["F17"]),
      autre_mesures_age_sup_75_ans_homme: excelParser.number(worksheet["G16"]),
      autre_mesures_age_sup_75_ans_femme: excelParser.number(worksheet["G17"]),

      tutelle_anciennete_inf_1_an: excelParser.number(worksheet["B26"]),
      tutelle_anciennete_1_3_ans: excelParser.number(worksheet["C26"]),
      tutelle_anciennete_3_5_ans: excelParser.number(worksheet["D26"]),
      tutelle_anciennete_5_10_ans: excelParser.number(worksheet["E26"]),
      tutelle_anciennete_sup_10_ans: excelParser.number(worksheet["F26"]),

      curatelle_anciennete_inf_1_an: excelParser.number(worksheet["B27"]),
      curatelle_anciennete_1_3_ans: excelParser.number(worksheet["C27"]),
      curatelle_anciennete_3_5_ans: excelParser.number(worksheet["D27"]),
      curatelle_anciennete_5_10_ans: excelParser.number(worksheet["E27"]),
      curatelle_anciennete_sup_10_ans: excelParser.number(worksheet["F27"]),

      maj_anciennete_inf_1_an: excelParser.number(worksheet["B28"]),
      maj_anciennete_1_3_ans: excelParser.number(worksheet["C28"]),
      maj_anciennete_3_5_ans: excelParser.number(worksheet["D28"]),
      maj_anciennete_5_10_ans: excelParser.number(worksheet["E28"]),
      maj_anciennete_sup_10_ans: excelParser.number(worksheet["F28"]),

      sauvegarde_justice_anciennete_inf_1_an: excelParser.number(
        worksheet["B29"]
      ),
      sauvegarde_justice_anciennete_1_3_ans: excelParser.number(
        worksheet["C29"]
      ),
      sauvegarde_justice_anciennete_3_5_ans: excelParser.number(
        worksheet["D29"]
      ),
      sauvegarde_justice_anciennete_5_10_ans: excelParser.number(
        worksheet["E29"]
      ),
      sauvegarde_justice_anciennete_sup_10_ans: excelParser.number(
        worksheet["F29"]
      ),

      autre_mesures_anciennete_inf_1_an: excelParser.number(worksheet["B30"]),
      autre_mesures_anciennete_1_3_ans: excelParser.number(worksheet["C30"]),
      autre_mesures_anciennete_3_5_ans: excelParser.number(worksheet["D30"]),
      autre_mesures_anciennete_5_10_ans: excelParser.number(worksheet["E30"]),
      autre_mesures_anciennete_sup_10_ans: excelParser.number(worksheet["F30"]),

      tutelle_etablissement_personne_handicapee: excelParser.number(
        worksheet["C37"]
      ),
      tutelle_service_personne_handicapee: excelParser.number(worksheet["C38"]),
      tutelle_ehpad: excelParser.number(worksheet["C40"]),
      tutelle_autre_etablissement_personne_agee: excelParser.number(
        worksheet["C41"]
      ),
      tutelle_chrs: excelParser.number(worksheet["C43"]),
      tutelle_service_hospitalier_soins_longue_duree: excelParser.number(
        worksheet["C44"]
      ),
      tutelle_service_psychiatrique: excelParser.number(worksheet["C45"]),
      tutelle_autre_service: excelParser.number(worksheet["C46"]),

      curatelle_etablissement_personne_handicapee: excelParser.number(
        worksheet["D37"]
      ),
      curatelle_service_personne_handicapee: excelParser.number(
        worksheet["D38"]
      ),
      curatelle_ehpad: excelParser.number(worksheet["D40"]),
      curatelle_autre_etablissement_personne_agee: excelParser.number(
        worksheet["D41"]
      ),
      curatelle_chrs: excelParser.number(worksheet["D43"]),
      curatelle_service_hospitalier_soins_longue_duree: excelParser.number(
        worksheet["D44"]
      ),
      curatelle_service_psychiatrique: excelParser.number(worksheet["D45"]),
      curatelle_autre_service: excelParser.number(worksheet["D46"]),

      maj_etablissement_personne_handicapee: excelParser.number(
        worksheet["E37"]
      ),
      maj_service_personne_handicapee: excelParser.number(worksheet["E38"]),
      maj_ehpad: excelParser.number(worksheet["E40"]),
      maj_autre_etablissement_personne_agee: excelParser.number(
        worksheet["E41"]
      ),
      maj_chrs: excelParser.number(worksheet["E43"]),
      maj_service_hospitalier_soins_longue_duree: excelParser.number(
        worksheet["E44"]
      ),
      maj_service_psychiatrique: excelParser.number(worksheet["E45"]),
      maj_autre_service: excelParser.number(worksheet["E46"]),

      sauvegarde_justice_etablissement_personne_handicapee: excelParser.number(
        worksheet["F37"]
      ),
      sauvegarde_justice_service_personne_handicapee: excelParser.number(
        worksheet["F38"]
      ),
      sauvegarde_justice_ehpad: excelParser.number(worksheet["F40"]),
      sauvegarde_justice_autre_etablissement_personne_agee: excelParser.number(
        worksheet["F41"]
      ),
      sauvegarde_justice_chrs: excelParser.number(worksheet["F43"]),
      sauvegarde_justice_service_hospitalier_soins_longue_duree: excelParser.number(
        worksheet["F44"]
      ),
      sauvegarde_justice_service_psychiatrique: excelParser.number(
        worksheet["F45"]
      ),
      sauvegarde_justice_autre_service: excelParser.number(worksheet["F46"]),

      autre_mesures_etablissement_personne_handicapee: excelParser.number(
        worksheet["G37"]
      ),
      autre_mesures_service_personne_handicapee: excelParser.number(
        worksheet["G38"]
      ),
      autre_mesures_ehpad: excelParser.number(worksheet["G40"]),
      autre_mesures_autre_etablissement_personne_agee: excelParser.number(
        worksheet["G41"]
      ),
      autre_mesures_chrs: excelParser.number(worksheet["G43"]),
      autre_mesures_service_hospitalier_soins_longue_duree: excelParser.number(
        worksheet["G44"]
      ),
      autre_mesures_service_psychiatrique: excelParser.number(worksheet["G45"]),
      autre_mesures_autre_service: excelParser.number(worksheet["G46"])
    };
    return rawData;
  } catch (err) {
    logger.warn('[IMPORT ENQUETE] Données "populations" invalide');
    logger.error(err);
    throw new HttpError(422, 'Données "populations" invalide');
  }
}

const enqueteExcelParserAgrementsFormations = {
  parse
};

module.exports = enqueteExcelParserAgrementsFormations;
