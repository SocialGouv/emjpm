const express = require("express");

const {
  getServiceIdBySiret,
} = require("~/controllers/dev/service-id-by-siret");

const router = express.Router();

router.get("/service-id-by-siret", getServiceIdBySiret);

module.exports = router;
