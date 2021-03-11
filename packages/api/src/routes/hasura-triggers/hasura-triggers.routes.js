const express = require("express");

const router = express.Router();

router.use("/ocmi", require("./ocmi"));
router.use("/mesures", require("./mesures"));

module.exports = router;
