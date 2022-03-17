const express = require("express");
const { getUser } = require("~/controllers/mandoline/user");
const {
  getDirectionServices,
} = require("~/controllers/mandoline/direction-services");

const directions = require("./directions");

const router = express.Router();

router.get("/user", getUser);
router.get("/direction-services", getDirectionServices);

router.use("/directions", directions);

module.exports = router;
