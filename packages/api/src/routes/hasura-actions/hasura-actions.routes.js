const express = require("express");

const router = express.Router();

router.use("/enquetes", require("./enquete/hasura-actions.enquetes.routes.js"));
router.use("/mesures", require("./mesure/hasura-actions.mesures.routes.js"));
router.use(
  "/mesure-etats",
  require("./mesure-etat/hasura-actions.mesure-etats.routes.js")
);

router.use("/emails", require("./email/hasura-actions.emails.routes.js"));
router.use(
  "/mandataires",
  require("./mandataire/hasura-actions.mandataires.routes.js")
);
router.use("/stats", require("./stat/hasura-actions.stats.routes.js"));
router.use(
  "/etablissements",
  require("./etablissement/hasura-actions.etablissements.routes.js")
);
router.use("/users", require("./user/hasura-actions.users.routes.js"));

module.exports = router;
