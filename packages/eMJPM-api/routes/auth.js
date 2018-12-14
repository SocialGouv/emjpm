const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uid = require("rand-token").uid;

const authHelpers = require("../auth/_helpers");
const passport = require("../auth/local");

const { updateLastLogin, updateUser } = require("../db/queries/users");
const {
  getSpecificMandataire,
  getMandataireById,
  getSpecificMandataireByToken
} = require("../db/queries/mandataires");

const { addDataLogs } = require("../db/queries/logsData");
const { resetPasswordEmail } = require("../email/password-reset");
const { confirmationPasswordEmail } = require("../email/password-confirmation");

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

        updateLastLogin(user.id)
          .then(() =>
            addDataLogs({
              user_id: user.id,
              action: "connexion",
              result: "success"
            })
          )
          .then(() => {
            const token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              process.env.JWTKEY
            );
            return res.status(200).json({
              success: true,
              url: redirs[user.type] || redirs.default,
              token
            });
          })
          .catch(e => {
            addDataLogs({
              user_id: user.id,
              action: "connexion",
              result: "fail"
            });
            return console.log(e);
          });
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
 *   post:
 *     tags:
 *       - login
 *     description: Create token for user's password forgotten
 *     requestBody:
 *       description: A JSON object containing email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: send email to he user with url for reset password
 */
router.post("/forgot_password", (req, res, next) => {
  const email = req.body.email;
  const token = uid(16);

  getSpecificMandataire({ email: email })
    .then(user => {
      if (!user) {
        throw new Error("user not found");
      }
      return updateUser(user.user_id, {
        reset_password_token: token,
        reset_password_expires: Date.now() + 7200000
      });
    })
    .then(() =>
      resetPasswordEmail(
        email,
        `${process.env.APP_URL}/reset-password?token=${token}`
      )
    )
    .then(() => res.status(200).json())
    .catch(e => {
      console.log(e);
      res.status(500).json();
    });
});
//7200000
/**
 * @swagger
 * /auth/reset_password:
 *   post:
 *     tags:
 *       - login
 *     description: Reset password and create new one
 *     requestBody:
 *       description: A JSON object containing reset password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 required: true
 *               newPassword:
 *                 type: string
 *                 required: true
 *               verifyPassword:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: send email to the user with confirmation of reset password
 *         headers:
 *           Set-Cookie:
 *             description: API server cookie
 */
router.post("/reset_password", (req, res, next) => {
  getSpecificMandataireByToken({ reset_password_token: req.body.token })
    .catch(res => {
      res.status(400).send({
        message: "Votre lien a expiré."
      });
      throw new Error();
    })
    .then(user => {
      if (!user) {
        return res.status(401).send({
          message: "Erreur."
        });
      }
      if (req.body.newPassword === req.body.verifyPassword) {
        return updateUser(user.user_id, {
          password: bcrypt.hashSync(req.body.newPassword, 10),
          reset_password_token: undefined,
          reset_password_expires: undefined
        })
          .then(id => getMandataireById(id))
          .then(mandataire => {
            return confirmationPasswordEmail(mandataire.email);
          });
      } else {
        return res.status(400).send({
          message: "Vos mots de passe ne sont pas équivalents."
        });
      }
    })
    .then(function() {
      res.status(200).json();
    });
});

module.exports = router;
