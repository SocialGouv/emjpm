const express = require("express");

const router = express.Router();
const { LbUpdateLog, ApiLog, ImpersonateLog } = require("~/models");

const KEEP_LOGS_DURATION_IN_DAYS = 60;

router.post("/all", async (req, res) => {
  const deleteFromDate = new Date();
  deleteFromDate.setDate(deleteFromDate.getDate() - KEEP_LOGS_DURATION_IN_DAYS);

  await Promise.all([
    LbUpdateLog.query().delete().where("created_at", "<", deleteFromDate),
    ApiLog.query().delete().where("created_at", "<", deleteFromDate),
    ImpersonateLog.query().delete().where("created_at", "<", deleteFromDate),
  ]);

  res.json({ sucess: true });
});

module.exports = router;
