const express = require("express");

const { importFinessFile } = require("./importer");
const checkImportEtablissementsParameters = require("./checker");
const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");

const router = express.Router();

// hasura action: `upload_mesures_file`
router.post(
  "/upload",
  async (req, res, next) => {
    try {
      const params = await checkImportEtablissementsParameters(req);
      const importSummary = await importFinessFile(params);

      return res.status(201);

      // .json({
      //   data: JSON.stringify(importSummary),
      // });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
