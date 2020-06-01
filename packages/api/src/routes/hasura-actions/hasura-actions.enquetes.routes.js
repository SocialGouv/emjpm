const express = require("express");

const logger = require("../../utils/logger");
const mandataireIndividuelEnqueteImporter = require("./enquete/mandataire-individuel-import/mandataireIndividuelEnqueteImporter");
const checkImportEnqueteParameters = require("./enquete/common/checkImportEnqueteParameters");
const hasuraActionErrorHandler = require("../../middlewares/hasura-error-handler");
const {
  initEnqueteMandataireIndividuel,
  submitEnqueteMandataireIndividuel
} = require("./enquete/mandataire-individuel/enqueteMandataireIndividuel");
const {
  checkEnqueteIndividuelParameters,
  checkEnqueteIndividuelSubmitParameters
} = require("./enquete/mandataire-individuel/checkEnqueteIndividuelParameters");

const router = express.Router();

router.post(
  "/mandataire-individuel/submit",
  async (req, res, next) => {
    await checkEnqueteIndividuelSubmitParameters(req, res);
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
    await checkEnqueteIndividuelParameters(req, res);

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
      const importSummary = await mandataireIndividuelEnqueteImporter.importEnqueteFile(
        importEnqueteParameters
      );

      return res.status(201).json({
        data: JSON.stringify(importSummary)
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
