const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const postLogin = require("../controllers/user/login");
const postSignup = require("../controllers/user/signup");

const jwkController = require("../controllers/jwk");

router.post(
  "/login",
  [
    body("username")
      .not()
      .isEmpty(),
    body("password")
      .not()
      .isEmpty(),
    check("username", "username must be at least 3 characters long").isLength({
      min: 3
    }),
    check("password", "password must be at least 3 characters long").isLength({
      min: 3
    })
  ],
  postLogin
);

router.post(
  "/signup",
  [
    body("username", "Votre nom d'utilisateur ne doit pas être vide")
      .not()
      .isEmpty(),
    check(
      "username",
      "Votre nom d'utilisateur doit être de 3 caractères minimum"
    ).isLength({
      min: 3
    }),
    check(
      "password",
      "Votre mot de passe doit être de 8 caractères minimum"
    ).isLength({
      min: 8
    }),
    check("password")
      .exists()
      .withMessage("Votre mot de passe doit ne doit pas être vide")
      .isLength({ min: 8 })
      .withMessage("Votre mot de passe doit être de 8 caractères minimum")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "Votre mot de passe doit contenir contenir au moins 1 chiffre et un caractère spéciale"
      )
  ],
  postSignup
);

router.get("/jwks", jwkController.getJwks);

module.exports = router;
