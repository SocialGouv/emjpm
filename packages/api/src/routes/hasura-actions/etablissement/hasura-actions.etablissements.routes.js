const express = require("express");

const { importFinessFile } = require("./actionFinessImporter");

const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");

const router = express.Router();

// hasura action: `import-finess`
router.post(
  "/import-finess",
  (req, res, next) => {
    const { url } = req.body.input;

    importFinessFile(url);

    try {
      return res.status(200).json({
        data: url,
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;
