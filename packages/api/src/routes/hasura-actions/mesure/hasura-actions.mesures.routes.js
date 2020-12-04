const express = require("express");

const { actionMesuresDelete } = require("./actions");
const { actionMesuresExport } = require("./actions");
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
  actionMesuresExport,
  hasuraActionErrorHandler("Unexpected error processing file")
);

// hasura action: `delete_mesure`
router.post(
  "/delete",
  actionMesuresDelete,
  hasuraActionErrorHandler("Unexpected error deleting mesure")
);

module.exports = router;
