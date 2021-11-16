const express = require("express");

const router = express.Router();

const deleteExpiredPending = require("./delete-expired-pending");
const updateStatus = require("./update-status");
const update = require("./update");
const recountUnached = require("./recount-uncached");

router.post("/delete-expired-pending", deleteExpiredPending);

router.use("/update-status", updateStatus);

router.use("/update", update);

router.use("/recount-uncached", recountUnached);

module.exports = router;
