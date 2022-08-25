const express = require("express");
const { getUser } = require("~/controllers/mandoline/user");
const {
  getDirectionServices,
} = require("~/controllers/mandoline/direction-services");
const {
  getDirectionDpfs,
} = require("../../controllers/mandoline/direction-dpfs");

const directions = require("./directions");
const service = require("./service");
const dpf = require("./dpf");

const router = express.Router();

router.get("/user", getUser);
router.get("/direction-services", getDirectionServices);
router.get("/direction-dpfs", getDirectionDpfs);

router.use("/directions", directions);
router.use("/service", service);
router.use("/dpf", dpf);

module.exports = router;
