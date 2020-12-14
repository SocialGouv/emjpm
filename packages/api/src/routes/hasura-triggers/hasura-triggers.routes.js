const express = require("express");

const router = express.Router();

router.use("/ocmi", require("./ocmi/hasura-triggers.ocmi.routes.js"));
router.use("/mesures", require("./mesures/hasura-triggers.mesures.routes.js"));

module.exports = router;
