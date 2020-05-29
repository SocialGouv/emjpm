const express = require("express");

const logger = require("../../utils/logger");
const { importMesuresFile } = require("./mesures-import");
const {
  checkEnqueteIndividuelParameters,
  checkImportMesuresParameters,
  checkImportEnqueteParameters
} = require("./checkParameters");

const {
  importEnqueteMandatairePreposeFile
} = require("./enquete-mandataire-prepose/import");
const {
  importEnqueteMandataireIndividuelFile
} = require("./enquete-mandataire-individuel/import");

const hasuraActionErrorHandler = require("../../middlewares/hasura-error-handler");
const {
  initEnqueteMandataireIndividuel
} = require("./enquete-mandataire-individuel/enqueteMandataireIndividuel");

const router = express.Router();

router.post("/enquetes/mandataire-individuel", async (req, res, next) => {
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
});

// hasura action: `upload_mesures_file`
router.post(
  "/mesures/upload",
  async (req, res, next) => {
    try {
      const importMesuresParameters = await checkImportMesuresParameters(req);

      const importSummary = await importMesuresFile(importMesuresParameters);

      return res.status(201).json({
        data: JSON.stringify(importSummary)
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

router.post(
  "/enquetes/mandataire-prepose/upload",
  async (req, res, next) => {
    try {
      // const importEnqueteParameters = await checkImportEnqueteParameters(req);
      const importSummary = await importEnqueteMandatairePreposeFile();

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
      const importSummary = await importEnqueteMandataireIndividuelFile(
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
