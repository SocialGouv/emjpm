const express = require("express");
const { getUser } = require("~/controllers/mandoline/user");
const {
  getDirectionServices,
} = require("~/controllers/mandoline/direction-services");

const router = express.Router();

router.get("/user", getUser);
router.get("/direction-services", getDirectionServices);

module.exports = router;
