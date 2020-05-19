const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authorize = require("../../controllers/user/oauth");

router.post(
  "/authorize",
  [
    body("editorToken")
      .not()
      .isEmpty(),
    body("editorId")
      .not()
      .isEmpty(),
    body("redirectUrl")
      .not()
      .isEmpty(),
    body("userId")
      .not()
      .isEmpty()
  ],
  authorize
);

module.exports = router;
