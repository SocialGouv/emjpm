const express = require("express");

const router = express.Router();

router.use("/ocmi", require("./ocmi"));
router.use("/mesures", require("./mesures"));
router.use("/lb-update", require("./lb-update"));
router.use("/clean-logs", require("./clean-logs"));
router.use("/p5-extract", require("./p5-extract"));

module.exports = router;
