const express = require("express");

const router = express.Router();

const deleteExpiredPending = require("./delete-expired-pending");
const update = require("./update");

router.post("/delete-expired-pending", deleteExpiredPending);

router.use("/update", update);

module.exports = router;
