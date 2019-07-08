const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const userController = require("../controllers/user");

router.post(
  "/login",
  [
    check("username").isLength({ min: 5 }),
    check("password").isLength({ min: 5 })
  ],
  userController.postLogin
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
  userController.postSignup
);
router.get("/jwks", userController.getJwks);

module.exports = router;
