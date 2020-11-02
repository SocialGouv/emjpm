const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "preposePrestationsSociales";

module.exports = async (enqueteReponse) => {
  const prestationsSociale =
    enqueteReponse.enquete_reponses_prepose_prestations_sociale;

  const get = (property) => {
    return prestationsSociale ? prestationsSociale[property] : {};
  };

  const status = {
    curatelle_renforcee: await getValidationStatus(get("curatelle_renforcee"), {
      debugName: `${debugGroupName}/curatelle_renforcee`,
      schema: tranches1a11(),
    }),
    curatelle_simple: await getValidationStatus(get("curatelle_simple"), {
      debugName: `${debugGroupName}/curatelle_simple`,
      schema: tranches1a11(),
    }),
    maj: await getValidationStatus(get("maj"), {
      debugName: `${debugGroupName}/maj`,
      schema: tranches1a11(),
    }),
    repartition: await getValidationStatus(prestationsSociale, {
      debugName: `${debugGroupName}/repartition`,
      logDataWithErrors: false,
      schema: yup.object({
        aah: yup.number().min(0).nullable(),
        als_apl: yup.number().min(0).nullable(),
        apa: yup.number().min(0).nullable(),
        asi: yup.number().min(0).nullable(),
        aspa: yup.number().min(0).nullable(),
        pch: yup.number().min(0).nullable(),
        rsa: yup.number().min(0).nullable(),
      }),
    }),
    sauvegarde_autres_mesures: await getValidationStatus(
      get("sauvegarde_autres_mesures"),
      {
        debugName: `${debugGroupName}/sauvegarde_autres_mesures`,
        schema: tranches1a11(),
      }
    ),
    tutelle: await getValidationStatus(get("tutelle"), {
      debugName: `${debugGroupName}/tutelle`,
      logData: true,
      logDataIfEmpty: true,
      logDataWithErrors: false,
      schema: tranches1a11(),
    }),
  };

  status.global = getGlobalStatus(status);

  return status;
};
function tranches1a11() {
  return yup.object({
    tranche1: yup.number().min(0).nullable(),
    tranche10: yup.number().min(0).nullable(),
    tranche11: yup.number().min(0).nullable(),
    tranche2: yup.number().min(0).nullable(),
    tranche3: yup.number().min(0).nullable(),
    tranche4: yup.number().min(0).nullable(),
    tranche5: yup.number().min(0).nullable(),
    tranche6: yup.number().min(0).nullable(),
    tranche7: yup.number().min(0).nullable(),
    tranche8: yup.number().min(0).nullable(),
    tranche9: yup.number().min(0).nullable(),
  });
}
