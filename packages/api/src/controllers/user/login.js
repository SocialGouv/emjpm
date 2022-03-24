const { authenticator } = require("otplib");
const passport = require("~/auth/auth-passport");
const { validationResult } = require("express-validator");
const { User, Logs } = require("~/models");

/**
 * Sign in using username and password and returns JWT
 */
const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  passport.authenticate("login-password", async (err, user) => {
    if (err) {
      switch (err) {
        case "User is inactive":
          res.status(401).json({
            errors: {
              error: err,
              location: "body",
              msg: "Votre compte est en attente d'activation, vous recevrez un email de confirmation",
            },
          });
          break;
        default:
          return res.status(401).json({
            errors: {
              error: err,
              location: "body",
              msg: "Vos informations de connexion sont erronées",
            },
          });
      }
    }

    if (user) {
      await Logs.query().insert({
        action: "connexion",
        result: "success",
        user_id: user.id,
      });

      const userResult = await user.getUser();

      await User.query().findById(user.id).update({
        last_login: new Date().toISOString(),
        refresh_token: userResult.refreshToken,
      });

      const userRow = await User.query().findById(user.id);
      if (userRow.secret_2fa) {
        const { code_2fa } = req.body;
        if (!code_2fa) {
          return res.status(200).json({ authEnabled2FA: true });
        }
        const isValid = authenticator.verify({
          secret: userRow.secret_2fa,
          token: code_2fa,
        });
        if (isValid) {
          return res.status(200).json(userResult);
        } else {
          return res.status(200).json({ authEnabled2FA: true, invalid: true });
        }
      }

      return res.status(200).json(userResult);
    }
  })(req, res, next);
};

module.exports = login;
