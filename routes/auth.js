const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const queryString = require("query-string");
const bcrypt = require("bcryptjs");
const uid = require("rand-token").uid;

const authHelpers = require("../auth/_helpers");
const passport = require("../auth/local");

const { updateLastLogin, updateUsers } = require("../db/queries/users");
const {
  getSpecificMandataire,
  updateMandataire,getMandataireById
} = require("../db/queries/mandataires");

const { resetPasswordEmail } = require("../scripts/password-reset");
const {
  confirmationPasswordEmail
} = require("../scripts/password-confirmation");

const redirs = {
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/tis",
  admin: "/admin",
  default: "/"
};

/**
 * @swagger
 *
 * components:
 *   requestBodies:
 *     Login:
 *       description: A JSON object containing user credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - login
 *     description: login to the API
 *     requestBody:
 *       required: true
 *       $ref: '#/components/requestBodies/Login'
 *     responses:
 *       200:
 *         headers:
 *           Set-Cookie:
 *             description: API server cookie
 *             schema:
 *               type: string
 *               example: connect.sid=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.post("/login", authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    if (user) {
      req.logIn(user, { session: false }, function(err) {
        if (err) {
          return next(err);
        }
        // return updateLastLogin(user.id).then(() => {
        const token = jwt.sign(
          JSON.parse(JSON.stringify(user)),
          "132453647586970asddhdhdhadydydyshshs2dhdhshHDssj"
        );
        return res.status(200).json({
          success: true,
          url: redirs[user.type] || redirs.default,
          token
        });
        // });
        // updateLastLogin(user.id).then(() => {
        //   res
        //     .status(200)
        //     .json({ success: true, url: redirs[user.type] || redirs.default });
        // });
      });
    }
  })(req, res, next);
});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - login
 *     description: logout from the API
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ success: true });
  next();
});

/**
 * @swagger
 * /auth/forgot_password:
 *   get:
 *     tags:
 *       - login
 *     description: Mot de passe oublié
 *     produces:
 *       - application/json
 *     responses:
 *       200
 */
router.post("/forgot_password", (req, res, next) => {
  const email = req.body.email;
  const token = uid(16);

  getSpecificMandataire({ email: email }).then(user => {
    updateUsers(JSON.parse(JSON.stringify(user))[0].user_id, {
      reset_password_token: token,
      reset_password_expires: Date.now() + 86400000
    }).then(result => {
      console.log("r", queryString.stringify(token));
      resetPasswordEmail(
        email,
        `http://localhost:3000/reset-password?token=${token}`
      );
    });
  });
});

/**
 * @swagger
 * /auth/reset_password:
 *   post:
 *     tags:
 *       - login
 *     description: Reset password and create new one
 *     requestBody:
 *       required: true
 *       $ref: '#/components/requestBodies/Login'
 *     responses:
 *       200:
 *         headers:
 *           Set-Cookie:
 *             description: API server cookie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.post("/reset_password", (req, res, next) => {
  console.log(req.body);
  getSpecificMandataire({ reset_password_token: req.body.token })
    .catch(res =>
      res.status(400).send({
        message: "Votre lien à expiré."
      })
    )
    .then(user => {
      if (req.body.newPassword === req.body.verifyPassword) {
        updateUsers(JSON.parse(JSON.stringify(user))[0].user_id, {
          password: bcrypt.hashSync(req.body.newPassword, 10),
          reset_password_token: undefined,
          reset_password_expires: undefined
        }).then(id => getMandataireById(id)).then(user => {
          console.log(user);
          confirmationPasswordEmail(user);
        });
      } else {
        return next(new Error(401));
      }
      return user;
    });
});

module.exports = router;
