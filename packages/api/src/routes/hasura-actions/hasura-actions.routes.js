const express = require("express");

const router = express.Router();

router.use("/enquetes", require("./enquete/hasura-actions.enquetes.routes.js"));
router.use("/mesures", require("./mesure/hasura-actions.mesures.routes.js"));

module.exports = router;
