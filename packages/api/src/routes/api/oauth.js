const express = require("express");
const passport = require("passport");

const oauthServer = require("~/oauth/server.js");

const router = express.Router();

router.post(
  "/authorize",
  passport.authenticate("user-jwt"),
  oauthServer.authorize({
    authenticateHandler: {
      handle: (req) => req.user,
    },
  })
);

router.post(
  "/token",
  oauthServer.token({
    requireClientAuthentication: {
      authorization_code: true,
    },
  })
);

module.exports = router;
