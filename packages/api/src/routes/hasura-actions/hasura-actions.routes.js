const express = require("express");

const logger = require("../../utils/logger");
const actionsMesuresImporter = require("./mesures-import/actionsMesuresImporter");
const checkImportMesuresParameters = require("./mesures-import/checkImportMesuresParameters");
const actionsEnqueteImporter = require("./enquete-import/actionsEnqueteImporter");
const checkImportEnqueteParameters = require("./enquete-import/checkImportEnqueteParameters");
const hasuraActionErrorHandler = require("../../middlewares/hasura-error-handler");
const {
  initEnqueteMandataireIndividuel
} = require("./enquetes/enqueteMandataireIndividuel");

const router = express.Router();

async function checkEnqueteIndividuelParameters(req, res) {
  const { enqueteId, mandataireId } = req.body.input;
  if (!enqueteId || !mandataireId) {
    res.status(422).json({
      message: "Invalid parameters: enqueteId or mandataireId is required"
    });
  }
}

router.post("/enquetes/individuel", async (req, res, next) => {
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
