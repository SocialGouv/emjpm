const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const postLogin = require("../controllers/user/login");
const postSignup = require("../controllers/user/signup");

const jwkController = require("../controllers/jwk");

router.post(
  "/login",
  [
    check("username").isLength({ min: 3 }),
    check("password").isLength({ min: 3 })
  ],
  postLogin
);

router.post(
  "/signup",
  [
    body("username")
      .not()
      .isEmpty(),
    check("password", "Password must be at least 4 characters long").isLength({
      min: 4
    })
  ],
  postSignup
);

router.get("/jwks", jwkController.getJwks);

module.exports = router;
