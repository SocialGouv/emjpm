const { validationResult } = require("express-validator");
const { resetPasswordEmail } = require("../../email/password-reset");
const createError = require("http-errors");
const { User } = require("../../model/User");
const uid = require("rand-token").uid;

/**
 * Forgot password using email return ok
 */

const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email;
  const token = uid(16);

  User.query()
    .where("email", email.toLowerCase().trim())
    .first()
    .then(function(user) {
      if (!user) {
        return next(
          createError.NotFound(`Aucun utilisateur avec l'email "${email}"`)
        );
      }
      resetPasswordEmail(
        user,
        email,
        `${process.env.APP_URL}/account/reset-password?token=${token}`
      );
      return res.status(200).json();
    })
    .catch(function(err) {
      return res.status(400).json({
        errors: {
          msg: "Une erreur est survenue",
          location: "body",
          error: err
        }
      });
    });
};

module.exports = forgotPassword;
