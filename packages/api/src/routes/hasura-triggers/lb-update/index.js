const express = require("express");

const router = express.Router();
const { LbUpdateLog } = require("~/models");

router.post("/service", async (req, res) => {
  const {
    event,
    table: { name: table },
  } = req.body;
  if (!event) {
    return;
  }
  const { op } = event;
  const hasuraUserId = event.session_variables["x-hasura-user-id"];
  const user_id = hasuraUserId ? parseInt(hasuraUserId) : null;
  const { old: o, new: n } = event.data;
  const siret = table === "services" && op === "DELETE" ? o.siret : null;
  const service_id =
    table === "services" ? n?.id || o?.id : n?.service_id || o?.service_id;

  await LbUpdateLog.query().insert({
    op,
    service_id,
    siret,
    table,
    user_id,
  });
  res.json({ success: true });
});

router.post("/liste-blanche", async (req, res) => {
  const {
    event,
    table: { name: table },
  } = req.body;
  if (!event) {
    return;
  }
  const { op } = event;
  const hasuraUserId = event.session_variables["x-hasura-user-id"];
  const user_id = hasuraUserId ? parseInt(hasuraUserId) : null;
  const { old: o, new: n } = event.data;
  const siret = table === "liste_blanche" && op === "DELETE" ? o.siret : null;
  const liste_blanche_id =
    table === "liste_blanche"
      ? n?.id || o?.id
      : n?.liste_blanche_id || o?.liste_blanche_id;

  await LbUpdateLog.query().insert({
    liste_blanche_id,
    op,
    siret,
    table,
    user_id,
  });
  res.json({ success: true });
});

module.exports = router;
