const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const uid = require("rand-token").uid;
const { updateResetPassword, getSpecificUser } = require("../db/queries/users");

const inscription = require("../db/queries/inscription");
const { resetPasswordEmail } = require("../email/forgot-password-email");

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
    .then(user => {
      res.status(200).json();
      resetPasswordEmail(
        user,
        email,
        `${process.env.APP_URL}/reset-password?token=${token}`
      );
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
