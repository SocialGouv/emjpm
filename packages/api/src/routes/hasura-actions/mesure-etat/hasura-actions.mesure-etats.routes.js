const express = require("express");

const { actionMesureEtatUpsert, actionMesureEtatDelete } = require("./actions");
const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");

const router = express.Router();

// hasura action upsert_mesure_etat
router.post(
  "/upsert",
  actionMesureEtatUpsert,
  hasuraActionErrorHandler("Unexpected error upserting mesure")
);

// hasura action upsert_mesure_etat
router.post(
  "/delete",
  actionMesureEtatDelete,
  hasuraActionErrorHandler("Unexpected error deleting mesure")
);

module.exports = router;
