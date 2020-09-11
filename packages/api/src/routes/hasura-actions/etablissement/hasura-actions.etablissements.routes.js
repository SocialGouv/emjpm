const express = require("express");

const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");

const router = express.Router();

// hasura action: `import-finess`
router.post(
  "/import-finess",
  async (req, res, next) => {
    const { url } = req.body.input;
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
