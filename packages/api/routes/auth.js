const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const uid = require("rand-token").uid;
const {
  updateResetPassword,
  updateUser,
  getSpecificUser,
  getUserWithValidToken
} = require("../db/queries/users");

const inscription = require("../db/queries/inscription");
const { resetPasswordEmail } = require("../email/password-reset");
const { confirmationPasswordEmail } = require("../email/password-confirmation");

router.post("/checkUser", async (req, res, next) => {
  try {
    const user = await getSpecificUser({ username: req.body.username });

    if (user && user.active === false) {
      return res.status(200).json({
        sucess: true,
        message:
          "Votre compte n'est pas encore actif, il sera validé très bientôt par l'équipe e-mjpm."
      });
    } else if (user) {
      return res.status(200).json({
        sucess: true,
        message: "votre adresse email ou votre mot de passe sont invalides."
      });
    } else {
      return res
        .status(200)
        .json({ sucess: true, message: "Impossible de se connecter" });
    }
  } catch (err) {
    next(err);
  }
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

  getSpecificUser({ email: email })
    .then(user => {
      if (!user) {
        throw createError.NotFound(`User "${email}" not Found`);
      }
      return updateResetPassword(user.id, token, "24 hours").then(() => user);
    })
    .then(user =>
      resetPasswordEmail(
        user,
        email,
        `${process.env.APP_URL}/reset-password?token=${token}`
      )
    )
    .then(() => res.status(200).json())
    .catch(next);
});

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
  getUserWithValidToken({ reset_password_token: req.body.token })
    .catch(err => {
      // 419 Authentication Timeout see http://getstatuscode.com/419
      // message: "Votre lien a expiré."
      throw createError(419, err);
    })
    .then(user => {
      if (!user) {
        throw createError.Unauthorized("Invalid token");
      }
      if (req.body.newPassword === req.body.verifyPassword) {
        return updateUser(user.id, {
          password: bcrypt.hashSync(req.body.newPassword, 10),
          reset_password_token: null,
          reset_password_expires: null
        }).then(() => {
          return confirmationPasswordEmail(user.email);
        });
      } else {
        throw createError.UnprocessableEntity("Not equal passwords.");
      }
    })
    .then(function() {
      res.status(200).json();
    })
    .catch(next);
});

router.get("/tis", async (req, res, next) => {
  try {
    const data = await inscription.getTiByRegion();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
