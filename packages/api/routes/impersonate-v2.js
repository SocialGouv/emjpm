const express = require("express");
const router = express.Router();
const postStartImpersonate = require("../controllers/impersonate/startImpersonate");
const postStopImpersonate = require("../controllers/impersonate/stopImpersonate");
const { typeRequired, loginRequired } = require("../auth/_helpers");
const { body } = require("express-validator");

router.post(
  "/start",
  [
    typeRequired("admin"),
    body("user_id")
      .not()
      .isEmpty()
  ],
  postStartImpersonate
);

router.post("/stop", [loginRequired], postStopImpersonate);

module.exports = router;
