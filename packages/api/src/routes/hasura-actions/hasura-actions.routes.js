const express = require("express");

const router = express.Router();

router.use("/enquetes", require("./hasura-actions.enquetes.routes.js"));
router.use("/mesures", require("./hasura-actions.mesures.routes.js"));

module.exports = router;
