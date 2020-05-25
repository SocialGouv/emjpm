const express = require("express");

const logger = require("../../utils/logger");
const actionsMesuresImporter = require("./mesures-import/actionsMesuresImporter");
const checkImportMesuresParameters = require("./mesures-import/checkImportMesuresParameters");
const actionsEnqueteImporter = require("./enquete-import/actionsEnqueteImporter");
const checkImportEnqueteParameters = require("./enquete-import/checkImportEnqueteParameters");
const hasuraActionErrorHandler = require("../../middlewares/hasura-error-handler");
const {
  initEnqueteMandataireIndividuel,
  submitEnqueteMandataireIndividuel
} = require("./enquete-mandataire-individuel/enqueteMandataireIndividuel");
const checkEnqueteIndividuelParameters = require("./enquete-mandataire-individuel/checkEnqueteIndividuelParameters");

const router = express.Router();

router.post(
  "/enquetes/submit",
  async (req, res, next) => {
    logger.info("/enquetes/submit");

    res.status(200).json({});

    // await checkEnqueteIndividuelParameters(req, res);
    // try {
    //   const { enqueteId, mandataireId } = req.body.input;
    //   const result = await submitEnqueteMandataireIndividuel({
    //     enqueteId,
    //     mandataireId
    //   });
    //   return res.status(200).json(result);
    // } catch (err) {
    //   logger.error(err);
    //   next(err);
    // }
  },
  hasuraActionErrorHandler("form cannot be submmited")
);

router.post(
  "/enquetes/mandataire-individuel",
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

// hasura action: `upload_mesures_file`
router.post(
  "/mesures/upload",
  async (req, res, next) => {
    try {
      const importMesuresParameters = await checkImportMesuresParameters(req);

      const importSummary = await actionsMesuresImporter.importMesuresFile(
        importMesuresParameters
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

// hasura action: `upload_enquete_file`
router.post(
  "/enquetes/upload",
  async (req, res, next) => {
    try {
      const importEnqueteParameters = await checkImportEnqueteParameters(req);

      const importSummary = await actionsEnqueteImporter.importEnqueteFile(
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
