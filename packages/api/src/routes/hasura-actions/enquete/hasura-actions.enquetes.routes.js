const express = require("express");
const HttpError = require("../../../utils/error/HttpError");

const logger = require("../../../utils/logger");
const mandataireIndividuelEnqueteImporter = require("./mandataire-individuel-import/mandataireIndividuelEnqueteImporter");
const preposeEnqueteImporter = require("./mandataire-prepose-import/preposeEnqueteImporter");
const checkImportEnqueteParameters = require("./hasura-actions.enquetes-import.checker");
const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");
const {
  initEnqueteMandataireIndividuel,
  submitEnqueteMandataireIndividuel
} = require("./mandataire-individuel/enqueteMandataireIndividuel");
const {
  initEnqueteMandatairePrepose
} = require("./mandataire-prepose/enqueteMandatairePrepose");

const router = express.Router();

router.post("/mandataire-prepose", async (req, res, next) => {
  try {
    const { enqueteId, mandataireId } = req.body.input;
    if (!enqueteId || !mandataireId) {
      return res.status(422).json({
        message: "Invalid parameters: enqueteId or mandataireId is required"
      });
    }

    const {
      enqueteReponsePrepose,
      status
    } = await initEnqueteMandatairePrepose({
      enqueteId,
      mandataireId
    });

    console.log("xxx status:", status);

    return res.json({
      enquete_reponses_status: status,
      enquete_id: enqueteReponsePrepose.enquete_id,
      submitted_at: enqueteReponsePrepose.submitted_at,
      enquete_reponses_id: enqueteReponsePrepose.id,
      enquete_reponses_modalites_exercice_id:
        enqueteReponsePrepose.enquete_reponses_modalites_exercice_id,
      enquete_reponses_modalites_exercice_status: 0,
      enquete_reponses_populations_id:
        enqueteReponsePrepose.enquete_reponses_populations_id,
      enquete_reponses_populations_curatelle_status: 0,
      enquete_reponses_populations_tutelle_status: 0,
      enquete_reponses_populations_accompagnement_judiciaire_status: 0,
      enquete_reponses_populations_sauvegarde_justice_status: 0,
      enquete_reponses_populations_autre_status: 0
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
});

router.post(
  "/mandataire-individuel/submit",
  async (req, res, next) => {
    const { id } = req.body.input;
    if (!id) {
      return res.status(422).json({
        message: "Invalid parameters: id is required"
      });
    }
    try {
      const { id } = req.body.input;
      const enqueteReponse = await submitEnqueteMandataireIndividuel(id);

      return res.json({
        enquete_id: enqueteReponse.enquete_id,
        enquete_reponses_id: enqueteReponse.id,
        submitted_at: enqueteReponse.submitted_at
      });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

router.post(
  "/mandataire-individuel",
  async (req, res, next) => {
    const { enqueteId, mandataireId } = req.body.input;
    if (!enqueteId || !mandataireId) {
      return res.status(422).json({
        message: "Invalid parameters: enqueteId or mandataireId is required"
      });
    }

    try {
      const { enqueteId, mandataireId } = req.body.input;
      const result = await initEnqueteMandataireIndividuel({
        enqueteId,
        mandataireId
      });
      return res.json(result);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

// hasura action: `upload_enquete_file`
router.post(
  "/upload",
  async (req, res, next) => {
    try {
      const importEnqueteParameters = await checkImportEnqueteParameters(req);

      let result;
      if (importEnqueteParameters.importContext.role === "individuel") {
        result = await mandataireIndividuelEnqueteImporter.importEnqueteFile(
          importEnqueteParameters
        );
      } else if (importEnqueteParameters.importContext.role === "prepose") {
        result = await preposeEnqueteImporter.importEnqueteFile(
          importEnqueteParameters
        );
      } else {
        logger.error(
          "Unexpected role",
          importEnqueteParameters.importContext.role
        );
        return next(new HttpError(500, "Undexpected role"));
      }

      return res.status(201).json({
        data: JSON.stringify(result)
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
