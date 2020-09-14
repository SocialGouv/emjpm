const express = require("express");

const router = express.Router();

router.use("/enquetes", require("./enquete/hasura-actions.enquetes.routes.js"));
router.use("/mesures", require("./mesure/hasura-actions.mesures.routes.js"));
router.use(
  "/etablissements",
  require("./etablissement/hasura-actions.etablissements.routes.js")
);

module.exports = router;
