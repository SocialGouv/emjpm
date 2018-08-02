const express = require("express");
const router = express.Router();

const authHelpers = require("../auth/_helpers");
const passport = require("../auth/local");

const { updateLastLogin } = require("../db/queries/users");

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
 *     description: logout from the API
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/Login'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.post("/login", authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        updateLastLogin(user.id).then(() => {
          res
            .status(200)
            .json({ success: true, url: redirs[user.type] || redirs.default });
        });
      });
    }
  })(req, res, next);
});

/**
 * @swagger
 * /auth/logout:
 *   get:
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

module.exports = router;
