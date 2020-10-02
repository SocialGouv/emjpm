const express = require("express");

const actionsMesuresImporter = require("./mesures-import/actionsMesuresImporter");
const checkImportMesuresParameters = require("./hasura-actions.mesures-import.checker");
const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");

const router = express.Router();

// hasura action: `upload_mesures_file`
router.post(
  "/upload",
  async (req, res, next) => {
    try {
      const importMesuresParameters = await checkImportMesuresParameters(req);

      const importSummary = await actionsMesuresImporter.importMesuresFile(
        importMesuresParameters
      );

      return res.status(201).json({
        data: JSON.stringify(importSummary),
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

// hasura action: `export_mesures_file`
router.post(
  "/export",
  async (req, res, next) => {
    try {
      const { userId, serviceId } = req.user;
      console.log(userId);
      return res.status(204);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
