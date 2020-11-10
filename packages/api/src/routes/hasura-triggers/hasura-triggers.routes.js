const express = require("express");

const router = express.Router();

router.use("/ocmi", require("./ocmi/hasura-triggers.ocmi.routes.js"));

module.exports = router;
