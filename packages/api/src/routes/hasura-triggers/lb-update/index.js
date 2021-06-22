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
  res.json({ sucess: true });
});

router.post("/lb-user", async (req, res) => {
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
  const siret = table === "lb_users" && op === "DELETE" ? o.siret : null;
  const lb_user_id =
    table === "lb_users" ? n?.id || o?.id : n?.lb_user_id || o?.lb_user_id;

  await LbUpdateLog.query().insert({
    lb_user_id,
    op,
    siret,
    table,
    user_id,
  });
  res.json({ sucess: true });
});

module.exports = router;
